import { DisplayMode, Version } from "@microsoft/sp-core-library";
import {
	IPropertyPaneConfiguration,
	PropertyPaneButtonType,
	PropertyPaneTextField, PropertyPaneChoiceGroup
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import { sp } from "@pnp/sp/presets/all";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import * as strings from "PageHeaderWebPartStrings";
import {
	PropertyFieldFilePicker,
	IFilePickerResult,
} from "@pnp/spfx-property-controls/lib/PropertyFieldFilePicker";

import * as $ from "jquery";

window["jQuery"] = window["$"] = $;

import {
	IPropertyPaneDropdownOption,
	PropertyPaneCheckbox,
	PropertyPaneDropdown,
} from "@microsoft/sp-property-pane";

require("uikit/dist/css/uikit.min.css");
require("uikit/dist/js/uikit.min.js");

export interface IPageHeaderWebPartProps {
	description: string;
	Page: string;
	multiSelect: string[];
	filePickerResult: IFilePickerResult;
	imageposition: string;
	color: string;
	actiontext: string;
	actionlink: string;
	title: string;
	intro: string;
	bodytext: string;
	htmlCode: string;
	jsonCode: string;
	showheader: boolean;
}

export default class PageHeaderWebPart extends BaseClientSideWebPart<IPageHeaderWebPartProps> {
	public render(): void {
		var headdisplay;
		if (this.properties.showheader == undefined) {
			headdisplay = "inline";
		} else if (this.properties.showheader == true) {
			headdisplay = "none";
		} else {
			headdisplay = "inline";
		}
		this.properties.jsonCode = $("#markup").text();
		if (this.properties.multiSelect == undefined) {
		} else if (this.properties.multiSelect.length >= 1) {
			var selectedcanvaselements = this.properties.multiSelect;
			$("body").append(`<style>li[data-tool*="alert"]{display:none}
li[data-tool*="socialPost"]{display:none}
li[data-tool*="header"]{display:none}
li[data-tool*="image"]{display:none}
li[data-tool*="list"]{display:none}
li[data-tool*="delimiter"]{display:none}
li[data-tool*="warning"]{display:none}
li[data-tool*="checklist"]{display:none}
li[data-tool*="quote"]{display:none}
li[data-tool*="linkTool"]{display:none}

li[data-tool*="table"]{display:none}</style>`);
			selectedcanvaselements.forEach((element) => {
				$("body").append(
					'<style> li[data-tool*="' + element + '"]{display:flex}</style>'
				);

			});
		}
		function getQueryStringParameter(param) {
			if (window.location.href.indexOf("?") > -1) {
				var params = document.URL.split("?")[1].split("&"); //Split Current URL With ? after that &
				var strParams = "";
				for (var i = 0; i < params.length; i = i + 1) {
					//param,parse with given URL parameter
					var singleParam = params[i].split("=");
					if (singleParam[0] == param) {
						return decodeURIComponent(singleParam[1]); //Decode URL Result
					}
				}
			}
		}

		sp.setup({
			spfxContext: this.context,
		});

		var headerreptext1;
		if (this.properties.color == undefined) {
			headerreptext1 = "#6dc3df";
		} else if (this.properties.color == "#009adf") {
			headerreptext1 = "#6dc3df";
		} else if (this.properties.color == "#5c0b8a") {
			headerreptext1 = "#bd83ca";
		}

		var mina = `font-family: 'Bristol' !important;`;
		var mainfont = `font-family: 'thesans' !important;`;
		var overlaycolor;
		if (this.properties.color == undefined) {
			overlaycolor = "rgba(0,60,165,.6)";
		} else if (this.properties.color == "#009adf") {
			overlaycolor = "rgba(0,60,165,.6)";
		} else if (this.properties.color == "#5c0b8a") {
			overlaycolor = "rgba(92,11,138,.6)";
		}
		if (this.properties.title != undefined) {
			var replacetext = this.properties.title.replace(
				"[",
				'<span style="' +
				mina +
				" font-size:70px; color:" +
				headerreptext1 +
				'">'
			);
			var endreplacetext = replacetext.replace("]", "</span>");
			var finaltext = endreplacetext.replace("|", "</br>");
		}
		var fileurl;
		if (this.properties.filePickerResult != undefined) {
			fileurl = this.properties.filePickerResult.fileAbsoluteUrl;
		} else {
			fileurl = "/";
		}
		var headertext;
		var headerreptext;

		if (this.properties.color == undefined) {
			headertext = "#007DB8";
		} else if (this.properties.color == "#009adf") {
			headertext = "#007DB8";
		} else {
			headertext = "#9e29b5";
		}

		if (this.properties.color == undefined) {
			headerreptext = "#003ca5";
		} else if (this.properties.color == "#009adf") {
			headerreptext = "#003ca5";
		} else if (this.properties.color == "#5c0b8a") {
			headerreptext = "#5c0b8a";
		}
		if (this.properties.intro != undefined || this.properties.intro != null || this.properties.intro != "") {
			var headingreplacetext = this.properties.intro.replace(
				"[",
				'<span style="' +
				mina +
				" font-size:50px;position:relative;color:" +
				headerreptext +
				'">'
			);
			var headingendreplacetext = headingreplacetext.replace("]", "</span>");
		} else {
			headingendreplacetext = "";
		}
		$("#itemimage").attr("src", fileurl);
		var imageheaderdesc;

		console.log(this.properties);

		this.domElement.innerHTML =
			`<div id="pagecolor" style="display:none">` +
			this.properties.color +
			`</div><div id="mainheader" style="` +
			mainfont +
			`height: 460px;
      overflow: hidden;" class="uk-inline">

      <div style="width:100vw; height:800px; background-position:`+ this.properties.imageposition + `" class="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light" data-src="` + fileurl + `" uk-img></div>
    <div style="background-color: ` +
			overlaycolor +
			`" class="uk-overlay headerimg uk-position-cover">
        <p style="` +
			mainfont +
			` color:white;font-size:70px;margin-top:5%;margin-left:90px;line-height:75px"  id="itemoverlay" >` +
			finaltext +
			`</p>
    </div>
</div>
<div uk-grid style="background:rgba(0,0,0,.00">
    <div style="width:75%;margin:auto">
    <div class="uk-section uk-section-muted uk-align-center" style="width: 80%;
    position: relative;
    bottom: 70px;background:white">
    <div class="uk-container">

        <h1 style="` +
			mainfont +
			`color:` +
			headertext +
			`; font-size:50px" data-item="` +
			this.properties.title +
			`" id="bodytitle">` +
			headingendreplacetext +
			`</h1>


            <div style="width:85%;margin:auto; background:transparent;font-weight:600;line-height:40px;font-size:21px; ` +
			mainfont +
			`">
            </br><div data-item="` +
			this.properties.bodytext +
			`" class="ce-paragraph">` +
			this.properties.bodytext +
			`</div>
           <a  data-item="` +
			this.properties.actiontext +
			`" style="width:85%;margin:auto;position:relative;left:30px;top:7px;font-size:12pt" class="ctaheader"  href="` +
			this.properties.actionlink + `">
			${this.properties.actiontext.trim() && this.properties.actiontext !== null ? `<i data-item="${this.properties.actiontext}" class='triangleheader'></i>` : ""}` +
			this.properties.actiontext +
			`</a>
            </div>
        </div>
</div>

    </div>
    <div></div>
</div>

<div id="modal-sections" class="uk-modal-container" uk-modal>
    <div class="uk-modal-dialog">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-modal-header">
            <h2 class="uk-modal-title">New Page</h2>
        </div>
        <div class="uk-modal-body">




    <div class="editable" id="editorjs"></div>

    <button id="savedraft" class="uk-button uk-button-primary uk-align-right" type="button">Save</button>
        <div style="" id="markup"></div>

        </div>
        <div class="uk-modal-footer uk-text-right">


        </div>
    </div>
</div>




<div id="modal-example" class="uk-modal-full" uk-modal uk-overflow-auto>
<div class="uk-modal-dialog">
    <button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>
    <div class="uk-grid-collapse uk-child-width-1-1@s uk-flex-middle" uk-grid>
        <div class="uk-background-cover" style="background-image: url('images/photo.jpg');" uk-height-viewport>

        <div style="padding-top:30px" class="uk-section  uk-preserve-color" uk-height-viewport>
<div style="width:90%;margin:auto" class="">

    <div class="uk-panel uk-light uk-margin-medium">
        <h3 style="color:#333">Choose an Image</h3>
    </div>

    <div class="uk-grid-match uk-grid-small uk-grid" uk-grid>
        <div class="uk-width-1-4@m">
            <div class="uk-height-large uk-card uk-card-default uk-card-body uk-flex uk-flex-center uk-flex-middle">
            <ul class="uk-tab-left" uk-tab="connect: #component-tab-left; animation: uk-animation-fade">
            <li><a  href="#">Corporate images</a></li>
            <li><a href="#">Images used by others</a></li>
            <li><a href="#">Upload and image</a></li>
        </ul>
            </div>
        </div>
        <div class="uk-width-expand@m">
            <div class="uk-card uk-card-default uk-card-body uk-height-large">
            <ul id="component-tab-left" class="uk-switcher">
            <li><div id="home" style="height:550px;">

            </div></li>
            <li><div  id="profile" style="height:550px;">

            </div>
            </li>
            <li>
            <div class="ui four column grid">
            <div class="two column row">
      <div class="column" style="max-width:400px" id="imagecroparea">

<img style="max-width: 100%;" id="croppableimage" src="https://www.globalpharmatek.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.jpg">
</div>
      </div>
      <div class="column" >
<div style="margin-top:20px" class="preview"></div></div>
<div class="column" style="position:relative;top:100px">
<span class="uk-text-middle">Choose an image</span>
<div uk-form-custom>
  <input type="file" id="getFile">
  <span class="uk-link">upload</span>
</div>

</div>
<div class="column" style="position:relative;top:100px">
<a id="cancel-btn" style="font-size:12px" class="ui blue basic button">Cancel</a>
<a href="#modal-example" uk-toggle id="crop_btn" style="font-size:12px" class="ui blue button">Save</a>
</div>
</div>
        </li>
        </ul>
            </div>
        </div>
    </div>

</div>
</div>
        </div>
    </div>
</div>
</div>
`;
		UIkit.modal("#modal-example", {});
		var colorstyle = $("#pagecolor").text();
		var slidenav;
		if (colorstyle == undefined) {
			slidenav = "#007DB8";
		} else if (colorstyle == "undefined") {
			slidenav = "#007DB8";
		} else if (colorstyle == "#009adf") {
			slidenav = "#007DB8";
		} else if (colorstyle == "#5c0b8a") {
			slidenav = "#9e29b5";
		}
		var slidenav1;
		if (colorstyle == "undefined") {
			slidenav1 = "#007DB8";
		} else if (colorstyle == "#009adf") {
			slidenav1 = "#007DB8";
		} else if (colorstyle == "#5c0b8a") {
			slidenav1 = "#5c0b8a";
		}

		$(".img").on("click", function () {
			$(".image").removeClass("selected");
			$(this).addClass("selected");
		});
		async function uploadfile(filename, file) {
			sp.web
				.getFolderByServerRelativeUrl("Shared%20Documents")
				.files.add(file.name, file, true);

			return setTimeout(this, 5000);
		}
		var savedraft = document.getElementById("savedraft");
		savedraft.addEventListener("click", () => {
			this.properties.htmlCode = $("#editorjs").html();
			UIkit.notification({ message: "Post saved ", status: "success" });

			function autosave() {
				$("#locationitems > div > span > span span").each(function (index) {
					$("#locations").append($(this).text());
				});
				$("#departmentitems > div > span > span span").each(function (index) {
					$("#teams").append($(this).text());
				});
				$("#savestatus").html("Saving..");
				var posttitle = $("#gettitle").text();

				var postintro = $("#getintro").text();
				var imagetext = $("#imagetext").text();
				var postbody = $(".codex-editor__redactor").html();
				$(".codex-editor__redactor").html();
				var author = 6;

				var iseditpost = $("#initialsaveid").text();

				sp.web.lists.getByTitle("SR_Pages").items.add({
					Title: posttitle,
					Page_Name: posttitle,

					Image_Text: imagetext,
					Header_Image: {
						__metadata: { type: "SP.FieldUrlValue" },
						Description: $("#previewimage").attr("src"),
						Url: $("#previewimage").attr("src"),
					},
					Intro_Header: postintro,

					Intro_Content: postbody,
					Page_Content: postbody,
					EditorMarkup: $("#markup").text(),
				});
				$("#modal-sections").addClass("uk-open").hide();
			}
		});

		$("#pageheader").remove();
		var url = this.context.pageContext.web.absoluteUrl;
		$("body").append(
			`<style id="pageheader" type="text/css">
      [data-item="undefined"], [data-item="null"]{display:none}
.triangleheader{width: 0;
  height: 0;
  border: 0 solid transparent;
  border-left-width: 22px;
  border-right-width: 1px;
  border-top: 18px solid ` +
			headerreptext +
			`;
  top: 19px;
    position: relative;
    left: -6px;}
    .ctaheader{color:` +
			headerreptext +
			` !important; font-family: 'thesans';}

#home > ul, #profile > ul {    max-height: 550px !Important;    height: 480px !important;    overflow-y: scroll;}
.uk-tab-left, .uk-tab-right {    flex-direction: column;    margin-left: 0;    width: 100%;}
.uk-tab-left>*, .uk-tab-right>* {  font-weight:700;  padding-left: 0;    padding-top: 30px;}
.ce-paragraph[data-placeholder]:empty::before{font-size:22px}
.ce-toolbox__button, .ce-toolbar__plus{width:24px !Important; height:24px !important;left: -10px;}
.codex-editor--narrow .ce-toolbar__plus {    left: 1% !important;}.ce-toolbox{left:30px}
.codex-editor svg {  font-size:14px !important;  fill: currentColor;       }
.ce-toolbox__button, .ce-toolbar__plus {    border: 1px solid silver;    border-radius: 100%;    padding: 8px;    margin-right: 12px;    height: 30px !important;    width: 30px !Important;    padding: 5px;}
.codex-editor--narrow .ce-toolbox {    left: 7% !important;}.ce-toolbar{right:30px}
.uk-card-default {    background: #fff;    color: #666;    box-shadow: 0 5px 15px rgba(0,0,0,.08);}
 div:empty:before {  content:attr(data-placeholder);  font-size:30px;color:gray}
 .preview { overflow: hidden;  width: 200px;   height: 200px;}
 #workbenchPageContent{max-width:1400px}[contenteditable][placeholder]:empty:before {    content: attr(placeholder);    color: #bababa;}
 .ce-block__content, .ce-toolbar__content{max-width:90%}
 .codex-editor--narrow .ce-toolbox {
  left: 1% !important;
}
.ce-paragraph{font-family: "thesans"; font-size:15px;line-height: 25px;

font-weight:lighter;
color: #53565a}
.inline-image__picture--stretched{width:100vw;position:absolute;right:0px}
.inline-image__image-credits{display:none}
.codex-editor--narrow .ce-toolbar__plus {
  left: -50px !important;
}


div[data-automation-id*="pageHeader"]{display:` +
			headdisplay +
			`}

.headerimg {
  padding: 30px;
  background: rgba(0,154,223,0.4);
  background-image: url(`+ url + `/Shared%20Documents/NW_headerimage_overlay_1.png);
  background-repeat: no-repeat;
  background-position: right top;
}


</style>
`
		);

		var isedit = getQueryStringParameter("Mode");
		if (this.displayMode == DisplayMode.Edit) {
			$("#newpage").show();
			$("#editpage").show();
		} else {
			$("#newpage").hide();
			$("#editpage").hide();
		}
	}

	private lists: IPropertyPaneDropdownOption[];
	private items: IPropertyPaneDropdownOption[];
	private listsDropdownDisabled: boolean = true;

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription,
					},
					displayGroupsAsAccordion: true,
					groups: [
						{
							groupName: "Header",

							groupFields: [
								PropertyFieldFilePicker("filePicker", {
									context: this.context as any,
									filePickerResult: this.properties.filePickerResult,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									onSave: (e: IFilePickerResult) => {

										this.properties.filePickerResult = e;
									},
									onChanged: (e: IFilePickerResult) => {

										this.properties.filePickerResult = e;
									},
									key: "filePickerId",
									buttonLabel: "Choose Image",
									label: "Choose Image",
								}),
								PropertyPaneChoiceGroup('imageposition', {
									label: "Image position",
									options: [
										{
											key: 'top', text: 'Top',
											imageSrc: 'https://cdn0.iconfinder.com/data/icons/position-1/20/move_top_left-256.png',
											imageSize: { width: 36, height: 36 },
											selectedImageSrc: 'https://cdn0.iconfinder.com/data/icons/position-1/20/move_top_left-256.png'
										},

										{
											key: 'bottom', text: 'Bottom',
											imageSrc: 'https://cdn0.iconfinder.com/data/icons/position-1/20/move_bottom_left-256.png',
											imageSize: { width: 36, height: 36 },
											selectedImageSrc: 'https://cdn0.iconfinder.com/data/icons/position-1/20/move_bottom_left-256.png'
										},
										{
											key: 'center', text: 'Center',
											imageSrc: 'https://cdn0.iconfinder.com/data/icons/position-1/20/align_center-256.png',
											imageSize: { width: 36, height: 36 },
											selectedImageSrc: 'https://cdn0.iconfinder.com/data/icons/position-1/20/align_center-256.png'
										}



									]
								}),
								PropertyPaneCheckbox("showheader", {
									text: "Hide page header",
								}),
								PropertyPaneTextField("title", {
									label: "Title",
								}),
								PropertyPaneTextField("intro", {
									label: "Intro",
								}),
								PropertyPaneTextField("bodytext", {
									label: "Body Text",
									multiline: true,
								}),
								PropertyPaneDropdown("color", {
									label: "Theme color",
									options: [
										{
											key: "#009adf",
											text: "Blue",
										},
										{
											key: "#5c0b8a",
											text: "Purple",
										},
									],
								}),
								PropertyPaneTextField("actiontext", {
									label: "Call to action text",
								}),
								PropertyPaneTextField("actionlink", {
									label: "Call to action link",
								}),
							],
						},
					],
				},
			],
		};
	}
}
