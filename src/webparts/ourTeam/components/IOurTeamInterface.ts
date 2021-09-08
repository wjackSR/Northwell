export interface IProfile {
	Id: number;
	FileRef: string;
	Biography: string;
	Email: string;
	Title: string;
	JobTitle: string;
	Highlights: string;
	Telephone: string;
}

export interface IOurTeamControllerProps {
	profiles: IProfile[];
}

export interface IOurTeamProps extends IOurTeamControllerProps {
	selectedProfile: IProfile;
	onSelectProfile: (profile: IProfile) => void;
	onDismissProfileModal: () => void;
}
