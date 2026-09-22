import { redis } from "@/lib/db";

/**
 * Update Guard ruleset - the server-side source of truth for the WordPress
 * core deprecation rules the phpinfo() WP plugin scans with.
 *
 * The plugin ships a baked-in copy of (roughly) this set as a fallback. Pro
 * sites pull THIS over the wire and cache it for 12h, so when a new WordPress
 * release deprecates something we can publish a rule once here - no plugin
 * release required.
 *
 * Rule shape must match what the PHP scanner expects:
 *   - re:    a PHP-PCRE pattern string *with delimiters* (the plugin validates
 *            it compiles before using it).
 *   - name:  human label shown in the report.
 *   - since: the WP version that deprecated/removed it.
 *   - fix:   one-line remediation.
 *   - def:   (php only) the rule intentionally matches a *definition* rather
 *            than a call, so the plugin's "skip your own function" guard is
 *            disabled for it.
 *
 * Bumping the schema version lets the client tell built-in from cloud rules.
 */
export const RULESET_SCHEMA_VERSION = 2;

export interface UGRule {
  re: string;
  name: string;
  since: string;
  fix: string;
  def?: boolean;
}

export interface UGRuleset {
  schema_version: number;
  generated_at: number;
  php_rules: UGRule[];
  js_rules: UGRule[];
  /** Highest PHP floor whose key is <= the target WP version applies. */
  core_php_floor: Record<string, string>;
}

const PHP_RULES: UGRule[] = [
  { re: "/(?<![\\w>$])get_currentuserinfo\\s*\\(/", name: "get_currentuserinfo()", since: "4.5", fix: "Use wp_get_current_user()" },
  { re: "/(?<![\\w>$])get_userdatabylogin\\s*\\(/", name: "get_userdatabylogin()", since: "3.3", fix: "Use get_user_by('login', …)" },
  { re: "/(?<![\\w>$])get_user_by_email\\s*\\(/", name: "get_user_by_email()", since: "3.3", fix: "Use get_user_by('email', …)" },
  { re: "/(?<![\\w>$])wp_get_http\\s*\\(/", name: "wp_get_http()", since: "4.4", fix: "Use wp_remote_get()" },
  { re: "/(?<![\\w>$])screen_icon\\s*\\(/", name: "screen_icon()", since: "3.8", fix: "No replacement - remove the call" },
  { re: "/(?<![\\w>$])get_settings\\s*\\(/", name: "get_settings()", since: "2.1", fix: "Use get_option()" },
  { re: "/(?<![\\w>$])attribute_escape\\s*\\(/", name: "attribute_escape()", since: "2.8", fix: "Use esc_attr()" },
  { re: "/(?<![\\w>$])clean_url\\s*\\(/", name: "clean_url()", since: "3.0", fix: "Use esc_url()" },
  { re: "/(?<![\\w>$])js_escape\\s*\\(/", name: "js_escape()", since: "2.8", fix: "Use esc_js()" },
  { re: "/(?<![\\w>$])wp_specialchars\\s*\\(/", name: "wp_specialchars()", since: "2.8", fix: "Use esc_html()" },
  { re: "/(?<![\\w>$])like_escape\\s*\\(/", name: "like_escape()", since: "4.0", fix: "Use $wpdb->esc_like()" },
  { re: "/(?<![\\w>$])image_resize\\s*\\(/", name: "image_resize()", since: "3.5", fix: "Use wp_get_image_editor()" },
  { re: "/(?<![\\w>$])wp_load_image\\s*\\(/", name: "wp_load_image()", since: "3.5", fix: "Use wp_get_image_editor()" },
  { re: "/(?<![\\w>$])add_object_page\\s*\\(/", name: "add_object_page()", since: "4.5", fix: "Use add_menu_page()" },
  { re: "/(?<![\\w>$])add_utility_page\\s*\\(/", name: "add_utility_page()", since: "4.5", fix: "Use add_menu_page()" },
  { re: "/(?<![\\w>$])wp_get_sites\\s*\\(/", name: "wp_get_sites()", since: "4.6", fix: "Use get_sites()" },
  { re: "/(?<![\\w>$])wp_make_content_images_responsive\\s*\\(/", name: "wp_make_content_images_responsive()", since: "5.5", fix: "Use wp_filter_content_tags()" },
  { re: "/(?<![\\w>$])wp_get_user_request_data\\s*\\(/", name: "wp_get_user_request_data()", since: "4.9.6", fix: "Use wp_get_user_request()" },
  { re: "/(?<![\\w>$])get_page_by_title\\s*\\(/", name: "get_page_by_title()", since: "6.2", fix: "Use WP_Query" },
  { re: "/(?<![\\w>$])get_the_author_email\\s*\\(/", name: "get_the_author_email()", since: "2.8", fix: "Use get_the_author_meta('email')" },
  // Extras pushed via cloud (not in the plugin's baked set) - proves the feed.
  { re: "/(?<![\\w>$])get_the_author_login\\s*\\(/", name: "get_the_author_login()", since: "2.8", fix: "Use get_the_author_meta('login')" },
  { re: "/(?<![\\w>$])wp_setcookie\\s*\\(/", name: "wp_setcookie()", since: "2.5", fix: "Use wp_set_auth_cookie()" },
  { re: "/(?<![\\w>$])get_alloptions\\s*\\(/", name: "get_alloptions()", since: "2.6", fix: "Use wp_load_alloptions()" },
  // PHP4-style constructor core no longer calls (real breakage on modern PHP).
  { re: "/function\\s+WP_Widget\\s*\\(/", def: true, name: "PHP4-style WP_Widget constructor", since: "4.3", fix: "Use __construct() and parent::__construct()" },
];

const JS_RULES: UGRule[] = [
  { re: "/\\.live\\s*\\(/", name: ".live()", since: "5.7", fix: "Use .on() with delegation" },
  { re: "/\\.die\\s*\\(/", name: ".die()", since: "5.7", fix: "Use .off()" },
  { re: "/\\.size\\s*\\(\\s*\\)/", name: ".size()", since: "5.7", fix: "Use .length" },
  { re: "/\\bjQuery\\.browser\\b/", name: "jQuery.browser", since: "5.7", fix: "Feature-detect instead" },
  { re: "/\\$\\.browser\\b/", name: "$.browser", since: "5.7", fix: "Feature-detect instead" },
  { re: "/\\.andSelf\\s*\\(/", name: ".andSelf()", since: "5.7", fix: "Use .addBack()" },
  { re: "/\\.toggle\\s*\\(\\s*function/", name: ".toggle(handler, handler)", since: "5.7", fix: "Bind click handlers manually" },
  { re: "/\\bjQuery\\.sub\\s*\\(/", name: "jQuery.sub()", since: "5.7", fix: "No replacement - refactor" },
  { re: "/\\bjQuery\\.fn\\.error\\s*\\(/", name: ".error() event", since: "5.7", fix: "Use .on('error', …)" },
  { re: "/\\bjQuery\\.parseJSON\\s*\\(/", name: "jQuery.parseJSON()", since: "5.7", fix: "Use JSON.parse()" },
  { re: "/\\b\\$\\.parseJSON\\s*\\(/", name: "$.parseJSON()", since: "5.7", fix: "Use JSON.parse()" },
  { re: "/\\bjQuery\\.isArray\\s*\\(/", name: "jQuery.isArray()", since: "5.7", fix: "Use Array.isArray()" },
  { re: "/\\bjQuery\\.trim\\s*\\(/", name: "jQuery.trim()", since: "5.7", fix: "Use String.prototype.trim()" },
];

const CORE_PHP_FLOOR: Record<string, string> = {
  default: "7.2.24",
  "6.6": "7.2.24",
  "7.0": "7.4",
};

export const BUILTIN_RULESET: UGRuleset = {
  schema_version: RULESET_SCHEMA_VERSION,
  generated_at: 0, // stamped at response time
  php_rules: PHP_RULES,
  js_rules: JS_RULES,
  core_php_floor: CORE_PHP_FLOOR,
};

/**
 * The ruleset to serve. A `ug:ruleset` key in Redis (valid JSON of UGRuleset
 * shape) wins, so you can hot-patch rules without a deploy; otherwise the
 * bundled set above is returned.
 */
export async function getRuleset(): Promise<UGRuleset> {
  try {
    const override = await redis.get<UGRuleset>("ug:ruleset");
    if (
      override &&
      typeof override === "object" &&
      Array.isArray(override.php_rules) &&
      Array.isArray(override.js_rules)
    ) {
      return { ...override, generated_at: Math.floor(Date.now() / 1000) };
    }
  } catch {
    // Redis hiccup - fall back to the bundled ruleset.
  }
  return { ...BUILTIN_RULESET, generated_at: Math.floor(Date.now() / 1000) };
}
