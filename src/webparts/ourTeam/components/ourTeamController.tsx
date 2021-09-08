import * as React from "react";
import * as jQuery from "jquery";
import { IProfile, IOurTeamControllerProps } from "./IOurTeamInterface";
import OurTeam from "./ourTeam";

const OurTeamController: React.FunctionComponent<IOurTeamControllerProps> = (props: IOurTeamControllerProps) => {
    const [selectedProfile, setSelectedProfile] = React.useState<IProfile>(null);

    return (
        <OurTeam
            {...props}
            selectedProfile={selectedProfile}
            onSelectProfile={(profile) => { setSelectedProfile(profile); (jQuery(".profile.modal") as any).modal({ blurring: true }).modal("setting", "transition", "scale").modal("show"); }}
            onDismissProfileModal={() => { setSelectedProfile(null); (jQuery(".profile.modal") as any).modal("hide"); }}
        />
    );
};

export default OurTeamController;