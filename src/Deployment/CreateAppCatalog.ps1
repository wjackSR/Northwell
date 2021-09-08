<# update org-name and site url below


Once complete upload the sr-spwp-experience_site.sppkg from the SharePoint solution folder into the app catalog

Then add the app sr-spext-experience_site to the site
#>

Connect-SPOService -url https://*org-name*-admin.sharepoint.com
Add-SPOSiteCollectionAppCatalog -Site *site-url*

