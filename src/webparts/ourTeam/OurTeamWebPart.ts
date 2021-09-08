import * as React from "react";
import * as ReactDom from "react-dom";
import UIkit from "uikit";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IProfile, IOurTeamControllerProps } from "./components/IOurTeamInterface";
import OurTeam from "./components/ourTeamController";

export default class OurTeamWebPart extends BaseClientSideWebPart<IOurTeamControllerProps> {
	private PROFILES: IProfile[];

	private _getTeamProfiles(): Promise<IProfile[]> {
		const { pageContext, spHttpClient } = this.context;
		
		return new Promise((resolve, reject) => {
			spHttpClient.get(`${pageContext.site.absoluteUrl}/_api/web/Lists/GetByTitle('Bios')/items?$select=*,FileRef&$top=10`, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
				response.json().then((responseJSON: any) => {
					if (responseJSON.error) {
						reject(responseJSON.error);
					}

					resolve(responseJSON.value);
				}, (error: any): any => reject(error));
			});
		});
	}

	protected onInit(): Promise<void> {
		return super.onInit().then(async _ => {
			SPComponentLoader.loadScript("https://cdn.jsdelivr.net/npm/uikit@3.5.4/dist/js/uikit.min.js");
			SPComponentLoader.loadScript("https://cdn.jsdelivr.net/npm/uikit@3.5.4/dist/js/uikit-icons.min.js");
			SPComponentLoader.loadCss("https://cdn.jsdelivr.net/npm/uikit@3.5.4/dist/css/uikit.min.css");
			SPComponentLoader.loadScript("https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.8/dist/semantic.min.js");
			SPComponentLoader.loadCss("https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.8/dist/semantic.min.css");

			UIkit.container = ".uk-scope";

			await this._getTeamProfiles().then(async (profiles: IProfile[]) => this.PROFILES = profiles).catch((err) => console.error(err));
		});
	}

	public render(): void {
		const element: React.ReactElement<IOurTeamControllerProps> = React.createElement(
			OurTeam, { profiles: this.PROFILES }
		);

		ReactDom.render(element, this.domElement);
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: ""
					},
					groups: []
				}
			]
		};
	}
}
