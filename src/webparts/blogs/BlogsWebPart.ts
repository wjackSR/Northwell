import { Version } from '@microsoft/sp-core-library';
import {
	IPropertyPaneConfiguration,
	PopupWindowPosition,
	PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import * as $ from "jquery";

window["jQuery"] = window["$"] = $;
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';


import {
	PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { sp } from "@pnp/sp/presets/all";
require("uikit/dist/css/uikit.min.css");
require("uikit/dist/js/uikit.min.js");

import { PropertyFieldSliderWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldSliderWithCallout';


import * as strings from 'BlogsWebPartStrings';

export interface IBlogsWebPartProps {
	filter: string;
	sliderWithCallout: number;
	items: string;
}

export default class BlogsWebPart extends BaseClientSideWebPart<IBlogsWebPartProps> {

	public render(): void {

		sp.setup({
			spfxContext: this.context
		});

		var slidenav;
		var cta;
		var colorstyle = $("#pagecolor").text();
		const uniqueref = Math.floor(Math.random() * 90000) + 10000;
		const attach = "#" + uniqueref;
		if (colorstyle == "undefined") { slidenav = "#004f9c"; } else
			if (colorstyle == undefined) { slidenav = "#004f9c"; } else
				if (colorstyle == "#009adf") { slidenav = "#004f9c"; } else
					if (colorstyle == "#5c0b8a") { slidenav = "#5c0b8a"; }

		if (colorstyle == "undefined") { cta = "#6dc3df"; } else
			if (colorstyle == undefined) { cta = "#6dc3df"; } else
				if (colorstyle == "#009adf") { cta = "#6dc3df"; } else
					if (colorstyle == "#5c0b8a") { cta = "#c38ebe"; }
		var filter = "OData__TopicHeader eq '" + this.properties.filter + "'";
		var imgh;
		if (this.properties.sliderWithCallout == undefined) { imgh = "200"; } else
			if (this.properties.sliderWithCallout == 3) { imgh = "200"; } else
				if (this.properties.sliderWithCallout == 2) { imgh = "300"; } else
					if (this.properties.sliderWithCallout == 4) { imgh = "150"; }
		var itemstoshow;
		if (this.properties.items == undefined) { itemstoshow = 2; } else { itemstoshow = +this.properties.items; }
		var items = sp.web.lists.getByTitle("Site Pages").items.select("Title", "FileRef", "BannerImageUrl", "Description", "OData__TopicHeader").filter(filter).top(itemstoshow).orderBy("Created", false).get().then(b => {
			b.forEach(element => {
				var url = this.context.pageContext.web.absoluteUrl;
				$(attach).append(
					`<div>
						<div class="uk-card uk-card-default" onclick="window.open('${element.FileRef}')" style="cursor: pointer;">
							<div class="uk-card-media-top">
								<a href="`+ element.FileRef + `"> <img style="width:100%; height:` + imgh + `px" src="` + element.BannerImageUrl.Url + `" alt=""></a>
							</div>
							<div class="uk-card-body cardhover" style="border-bottom:4px solid `+ colorstyle + `">
								<h3 style="color:`+ colorstyle + `;font-size: 25px;
								line-height: 30px;
								height: 60px;
								overflow: hidden;" class="uk-card-title">`+ element.Title + `</h3>
								<p style="max-height: 75px;height:75px;
								overflow: hidden;" class="ce-paragraph">${element.Description ? element.Description : ""}</p>
								<p>Tags: `+ element.OData__TopicHeader + `</p>
								<a style="width:85%;margin:auto;position:relative;top:7px;font-size:12pt" class="cta"  href="`+ element.FileRef + `"> <i style="" class="triangle"></i>Read more</a>
							</div>
						</div>
					<div>`);
			});
		});

		this.domElement.innerHTML = `
    <div id="`+ uniqueref + `" class="uk-child-width-1-` + this.properties.sliderWithCallout + `@m uk-grid-match" uk-grid>


</div>
    `;


		$("body")
			.append(`<style id="createtabs" type="text/css">

.uk-card-title, .uk-card-body p, .uk-card-footer a{font-family:'thesans' !Important;text-transform:none}
.cta{color:`+ colorstyle + ` !important; font-family: 'thesans';}
.triangle{width: 0;
  height: 0;
  border: 0 solid transparent;
  border-left-width: 22px;
  border-right-width: 1px;
  border-top: 18px solid `+ colorstyle + ` ;
  top: 19px;
    position: relative;
    left: -6px;}

    .cardhover:hover{background:`+ slidenav + `;}
    .cardhover:hover h3, .cardhover:hover p{color:white !important}

    .cardhover:hover .triangle{border-top: 18px solid `+ cta + ` !important;}
    .cardhover:hover .cta{color: `+ cta + ` !important;;}
</style>`);
	}



	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneDropdown('filter', {
									label: "Choose tag",
									options: [
										{
											key: "Recognition",
											text: "Recognition"
										},
										{
											key: "Awards",
											text: "Awards"
										}
										,
										{
											key: "Knowledge",
											text: "Knowledge"
										},
										{
											key: "FAQs",
											text: "FAQs"
										}
									]
								}),
								PropertyFieldSliderWithCallout('sliderWithCallout', {


									key: 'sliderWithCalloutFieldId',
									label: 'Items per row',
									max: 4,
									min: 2,
									step: 1,
									showValue: true,
									value: this.properties.sliderWithCallout,
									debounce: 10
								}),
								PropertyPaneTextField('items', {
									label: "No of items to show"
								}),
							]
						}
					]
				}
			]
		};
	}
}
