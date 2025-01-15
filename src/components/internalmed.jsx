const generateInternalMed = () => {
    const {
        coronerName,
        coronerRank,
        coronerBadge,
        incidentDescription,
        incidentLocation,
        incidentDateTime,
        policeNotification,
        treatmentLocation,
        incidentPhotos,
    } = formData;

    let bbCode = `
[b]EMPLOYEE NAME:[/b] ${coronerName} ${coronerRank} ${coronerBadge}
[b]INCIDENT DESCRIPTION:[/b] ${incidentDescription}
[b]LOCATION:[/b] ${incidentLocation}
[b]DATE/TIME:[/b] ${incidentDateTime}
[b]TREATMENT LOCATION:[/b] ${treatmentLocation}
[b]POLICE NOTIFIED:[/b] ${policeNotification}
[b]PHOTOS:[/b] ${incidentPhotos}
`;

    return bbCode;
};

export default generateInternalMed;