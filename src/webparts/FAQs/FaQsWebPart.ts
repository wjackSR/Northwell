import { Version } from '@microsoft/sp-core-library';

import {
	IPropertyPaneConfiguration,
	PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import * as $ from "jquery";
import * as jQuery from "jquery";
window["jQuery"] = window["$"] = $;
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import { sp } from "@pnp/sp/presets/all";
require("uikit/dist/css/uikit.min.css");
require("uikit/dist/js/uikit.min.js");
import * as strings from 'FaQsWebPartStrings';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import * as React from 'react';
export interface IFaQsWebPartProps {
	description: string;
	collectionData: any[];
}

export default class FaQsWebPart extends BaseClientSideWebPart<IFaQsWebPartProps> {

	public render(): void {
		var colorstyle = $("#pagecolor").text();
		var slidenav;
		if (colorstyle == "undefined") { slidenav = "#007DB8"; } else
			if (colorstyle == "#009adf") { slidenav = "#007DB8"; } else
				if (colorstyle == "#5c0b8a") { slidenav = "#5c0b8a"; }
		$("body")
			.append(`<style id="createfaq" type="text/css">

    .ce-paragraph,.cke_editable p{font-family: "thesans"; font-size:10pt;line-height: 20pt;

    font-weight:lighter;
    color: #53565a}
    .uk-accordion-content h2{display: block;
      font-size: 1.25rem;
      line-height: 1.4;

      overflow: hidden;}
    .uk-accordion-content h3{display: block;
      font-size: 1.25rem;
      line-height: 1.4;

      overflow: hidden;}
    .uk-accordion-content h4{display: block;
      font-size: 1.25rem;
      line-height: 1.4;

      overflow: hidden;color:`+ slidenav + `;line-height:40px}

    .uk-accordion-title:before {
      content: "";
      width: 1.4em;
      height: 1.4em;
      margin-left: 10px;
      float: right;
      background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg width='13' height='13' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%93666' d='M0 6h13v1H0z'/%3E%3Cpath fill='%93666' d='M6 0h1v13H6z'/%3E%3C/svg%3E) !important;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      border-radius:100%;
      border: 1px solid `+ slidenav + `
  }
  .uk-accordion li{
    border-bottom: 1px solid rgba(0,0,0,.04);
    padding: 20px;
    padding-top: 10px;
  }
    </style>`);

		this.domElement.innerHTML = `


    <ul id="acc" uk-accordion>

</ul>
     `;
		if (this.properties.collectionData != undefined) {
			this.properties.collectionData.forEach(item => {
				$("#acc").append(`<li class="">
									<a style="color:`+ slidenav + `" class="uk-accordion-title" href="#">` + item.title + `</a>
									<div class="uk-accordion-content cke_editable">
										<p>${item.question ? item.question : ""}</p>
										<h4>Answer</h4>
										<p>`+ item.answer + `</p>
									</div>
								</li>`);

			});
		}
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
								PropertyFieldCollectionData("collectionData", {
									key: "collectionData",
									label: "Create FAQ's",
									panelHeader: "FAQ's Creation",
									manageBtnLabel: "Manage FAQ's",
									value: this.properties.collectionData,
									fields: [

										{
											id: "title",
											title: "Title",
											type: CustomCollectionFieldType.string,
											required: true,

										},
										{
											id: "question",
											title: "Question",
											type: CustomCollectionFieldType.string
										},
										{
											id: "answer",
											title: "Answer",
											type: CustomCollectionFieldType.string,

											required: true
										}
									],
									disabled: false
								})
							]
						}
					]
				}
			]
		};
	}
}
