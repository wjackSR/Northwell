import * as React from "react";
import { IOurTeamProps } from "./IOurTeamInterface";
import S from "./ourTeam.module.scss";

const MyBookmarks: React.FunctionComponent<IOurTeamProps> = (props: IOurTeamProps) => {
	const { profiles, selectedProfile, onSelectProfile, onDismissProfileModal } = props;
	const {
		Title: profileTitle,
		Biography: profileBiography,
		FileRef: profilePhoto,
		JobTitle: profileRole,
		Email,
		Highlights,
		Telephone,
	} = selectedProfile || { Biography: null, Email: null, FileRef: null, JobTitle: null, Highlights: null, Telephone: null, Title: null, };

	return (
		<div id="ourteam" className={S.ourteam}>
			{
				profiles && profiles.length > 0 ?
					(
						<div className="uk-child-width-1-1@s uk-child-width-1-2@m uk-child-width-1-2@l" uk-grid="parallax: 150">
							{
								profiles.map(({ Id, FileRef, Biography, JobTitle, Title }, index) => (
									<div key={Id} className={S.card} onClick={() => onSelectProfile(profiles[index])}>
										<div className="uk-card uk-card-default" style={{ overflow: "hidden", boxShadow: "none" }}>
											<figure style={{ backgroundImage: `url("${FileRef}")` }} className="uk-card-media-top" title={Title} />
											<div className="uk-card-body" style={{ padding: "20px 0 0" }}>
												<h3 className="uk-card-title">{Title}</h3>
												<span>{JobTitle}</span>
												<p>{Biography}</p>
												<a>Read more</a>
											</div>
										</div>
									</div>
								))
							}
						</div>
					)
					:
					(
						<div className="sixteen wide column">
							<div className="ui placeholder segment">
								<div className="ui icon header">
									<i className="bookmark outline icon" />
									No Team Profiles
								</div>
								{/* <p style={{ textAlign: "center" }}>Don't forget to bookmark the pages you like the most, so you can find them easily over here</p> */}
							</div>
						</div>
					)
			}
			<div className={`ui profile fullscreen modal ${S.profile}`}>
				<div className={S.close} title="Close" onClick={onDismissProfileModal} />
				<div className="ui segment very padded">
					<div className="ui grid" style={{ maxWidth: "974px", margin: "0 auto" }}>
						<div className="four wide column">
							<figure style={{ backgroundImage: `url("${profilePhoto}")` }} className="uk-card-media-top" title={profileTitle} />
							<div className={S.highlights} dangerouslySetInnerHTML={{ __html: Highlights }} />
						</div>
						<div className="twelve wide column" style={{ paddingLeft: "60px" }}>
							<div className={S.header}>
								<h3>{profileTitle}</h3>
								<h3>{profileRole}</h3>
							</div>
							<div className={S.contact}>
								<label><span>Email: </span><a href={`mailto:${Email}`}>{Email}</a></label>
								<label><span>Telephone: </span>{Telephone}</label>
							</div>
							<div className={S.about}>
								<label>About</label>
								<div dangerouslySetInnerHTML={{ __html: profileBiography }} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyBookmarks;
