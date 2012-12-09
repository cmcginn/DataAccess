using System.Web;
using System.Web.Optimization;

namespace FindIt.Spa
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.UseCdn = true;
            bundles.Add(new ScriptBundle("~/bundles/jquery", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui","http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.20/jquery-ui.min.js").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));

            bundles.Add(new ScriptBundle("~/bundles/jsextlibs")
                //.IncludeDirectory("~/Scripts/lib", "*.js", searchSubdirectories: false));
                .Include(
                    "~/Scripts/json2.js", // IE7 needs this

                    // jQuery plugins
                    "~/Scripts/activity-indicator.js",
                    "~/Scripts/jquery.mockjson.js",
                    "~/Scripts/TrafficCop.js",
                    "~/Scripts/infuser.js", // depends on TrafficCop

                    // Knockout and its plugins
                    "~/Scripts/knockout-{version}.js",
                    "~/Scripts/knockout.activity.js",
                    "~/Scripts/knockout.asyncCommand.js",
                    "~/Scripts/knockout.dirtyFlag.js",
                    "~/Scripts/knockout.validation.js",
                    "~/Scripts/koExternalTemplateEngine.js",

                    // Other 3rd party libraries
                    "~/Scripts/underscore.js",
                    "~/Scripts/moment.js",
                    "~/Scripts/sammy-{version}.js",
                    "~/Scripts/amplify.*",
                    "~/Scripts/toastr.js"
                    ));

            // 3rd Party CSS files
            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/boilerplate-styles.css",
                "~/Content/toastr.css",
                "~/Content/toastr-responsive.css"));

            // Custom LESS files
            bundles.Add(new Bundle("~/Content/Less", new LessTransform(), new CssMinify())
                .Include("~/Content/styles.less"));


        }
    }
}