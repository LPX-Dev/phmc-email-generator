import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState, useEffect } from 'react';
import Paperwork from './myPaperwork2.png';
import Feedback from './feedback.png';
import Notification from './components/Notification';
import LSPDLogo from './assets/lspd.png';
import LSSDLogo from './assets/lssd.png';
import LSFDLogo from './assets/lsfd.png';
import PHMCLogo from './assets/phmc.png';
import { Form, Button, InputGroup } from 'react-bootstrap';
import './App.css';
import './buttons.css'


function App() {
    const [formData, setFormData] = useState({
        coronerRank: 'Forensic Attendant',
        placeOfDeath: '',
        department: '',
        dateTime: '',
        coronerName: '',
        serialNumber: '',
        decedentName: '',
        pronouncedTimeOfDeath: '',
        synopsis: '',
        probableCauseOfDeath: '',
        mannerOfDeath: '',
        typeOfDeath: 'PK',
        decedentOOC: '',
        scenePhotos: '',
        // email stuff
        additionalImages: '',
        requestingOfficer: '',
        coronerDiscord: '',
        coronerPHNumber: '50056',
        deathReport: '',
        additionalReports: [],
        showAdditionalReports: false,
        internalReport: '',
        internalAdditionalReports: '',
        showInternalAdditionalReports: false,
        policeNotification: '',
        partiesInvolved: [''],
        treatmentLocation: '',
        moreDeathReports: [''],
        // surgical operations fields
        leadSurgeon: '',
        extraStaff: '',
        patientName: '',
        patientConsent: '',
        patientAllergies: '',
        surgeryComplications: '',
        surgeryProcedures: '',
        drugType: '',
        postDrugtype: '',
        surgicalSummery: '',
        surgeryTime: '',
        // physical evaluation fields
        leadDoctor: '',
        medicalComplications: '',
        treatmentProcedures: '',
        medType: '',
        postTreatment: '',
        medicalSummary: '',
        evalTime: '',
        patientPH: '',
        patientBPM: '',
        patientBMI: '',
        patientTemperature: '',
        patientCareer: '',
        patientHeight: '',
        patientWeight: '',
        patientpulse: '',
        patientOxi: '',
        patientImpairments: '',
        patientPastDiseases: '',
        patientAssessment: '',
        appointmentDate: '',
        // dental fields
        PatientMedicalRecord: '',
        PatientName: '',
        patientChewing: '',
        patientPriority: '',
        patientMedicine: '',
        patientNewMedicine: '',
        patientTreatment: '',
        patientDiagnosis: '',
        patientPrescription: '',
        patientSummary: '',
        dentistName: '',
        date: '',
        // Medical Consultation - Internal Medicine 
        doctorName: '',
        patientMedicalRecord: '',
        patientGender: '',
        patientDateofBirth: '',
        patientEmail: '',
        patientAddress: '',
        patientEmergencyContact: '',
        patientEmergencyContactNumber: '',
        patientEmergencyContactRelation: '',
        patientBloodType: '',
        patientChronicDiseases: '',
        patientBP: '',
        // New fields for Medical Consultation Internal Medicine 2
        patientResperation: '',
        patientConsultation: '',
        patientPerscription: '',
        patientSummaryConsultation: '',
        doctorNameImage: '',
        patientCondition: '',
        patientNotes: ''
    });
    const [isUploading, setIsUploading] = useState(false);
    const [isJohnDoe, setIsJohnDoe] = useState(false);
    const [isJaneDoe, setIsJaneDoe] = useState(false);
    const [bbCodeVersion, setBbCodeVersion] = useState(1);
    const [notification, setNotification] = useState(null);
    const [commitInfo, setCommitInfo] = useState({ sha: '', date: null });

    useEffect(() => {
        fetch('https://api.github.com/repos/LPX-Dev/phmc-death-report/commits/gh-pages')
            .then(response => response.json())
            .then(data => {
                const commitDate = new Date(data.commit.author.date);
                setCommitInfo({
                    sha: data.sha.substring(0, 7),
                    date: commitDate.toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short'
                    })
                });
            })
            .catch(error => console.error('Error fetching commit:', error));
    }, []);

    const handleImageUpload = async (event, fieldName) => {
        const files = event.target.files;
        if (!files.length) return;

        setIsUploading(true);
        const uploadedUrls = [];

        try {
            for (let file of files) {
                const formData = new FormData();
                formData.append('image', file);

                const response = await fetch(`https://api.imgbb.com/1/upload?key=bc8a1a6273ac8d229eef458de4a31d2d`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                if (data.success) {
                    uploadedUrls.push(data.data.url);
                }
            }

            if (uploadedUrls.length > 0) {
                const currentValue = formData[fieldName];
                const newValue = currentValue
                    ? `${currentValue}, ${uploadedUrls.join(', ')}`
                    : uploadedUrls.join(', ');

                setFormData(prev => ({
                    ...prev,
                    [fieldName]: newValue
                }));
                showNotification(`${uploadedUrls.length} image(s) uploaded successfully!`, 'check-circle');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            showNotification('Upload failed!', 'exclamation-circle');
        } finally {
            setIsUploading(false);
        }
    };

    const [showChangelog, setShowChangelog] = useState(false);

    const [coronerList] = useState([
        { name: 'Anne Carter', badge: '4892', jobTitle: 'Chief Medical Examiner' },
        { name: 'Yari Woods', badge: '113472', jobTitle: 'Deputy Chief Medical Examiner' },
        { name: 'Matthias Morse', badge: '169662', jobTitle: 'Medical Examiner' },
        { name: 'Rebecca Rose', badge: '170228', jobTitle: 'Medical Examiner' },
        { name: 'Chloe Howard', badge: '54372', jobTitle: 'Medical Examiner' },
        { name: 'Elena Hill', badge: '108273', jobTitle: 'Coroner Investigator' },
        { name: 'Wesley Kramer', badge: '16511', jobTitle: 'Coroner Investigator' },
        { name: 'Laurent Hall', badge: '91338854', jobTitle: 'Supervisor Forensic Attendant' },
        { name: 'Roger McFarlane', badge: '1552', jobTitle: 'Senior Forensic Attendant' },
        { name: 'Pubert Kennedy', badge: '171763', jobTitle: 'Forensic Attendant' },
        { name: 'Alyson Frost', badge: '5573', jobTitle: 'Senior Forensic Attendant' },
        { name: 'Justin Moran', badge: '165127', jobTitle: 'Forensic Attendant' },
        { name: 'Patrick Boyd', badge: '171368', jobTitle: 'Forensic Attendant' },
    ]);


    // Add utility function
    const containsNumbers = (str) => /\d/.test(str);

    // Add URL validation regex near other constants
    const URL_REGEX = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i;

    // Update handleChange function
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => {
            const updates = { [name]: value };

            // Handle badge number and job title auto-fill for coroner selection
            if (name === 'coronerName') {
                const selectedCoroner = coronerList.find(c => c.name === value);
                if (selectedCoroner) {
                    updates.serialNumber = selectedCoroner.badge;
                    updates.coronerRank = selectedCoroner.jobTitle;
                }
            }

            // Handle badge number formatting for requesting officer
            if (name === 'requestingOfficer' && containsNumbers(value)) {
                if (!value.startsWith('BN#')) {
                    updates[name] = `BN#${value}`;
                }
            }

            // Handle doctor signature image URL
            if (name === 'doctorNameImage' && URL_REGEX.test(value.trim())) {
                updates[name] = `[img]${value.trim()}[/img]`;
            }

            // Allow manual override of badge number
            if (name === 'serialNumber') {
                updates.serialNumber = value;
            }

            return { ...prev, ...updates };
        });
    };

    const handleDoeChange = (type) => (e) => {
        if (type === 'john') {
            setIsJohnDoe(e.target.checked);
            setIsJaneDoe(false);
            if (e.target.checked) {
                setFormData(prev => ({ ...prev, decedentName: 'John Doe' }));
            } else if (formData.decedentName === 'John Doe') {
                setFormData(prev => ({ ...prev, decedentName: '' }));
            }
        } else {
            setIsJaneDoe(e.target.checked);
            setIsJohnDoe(false);
            if (e.target.checked) {
                setFormData(prev => ({ ...prev, decedentName: 'Jane Doe' }));
            } else if (formData.decedentName === 'Jane Doe') {
                setFormData(prev => ({ ...prev, decedentName: '' }));
            }
        }
    };


    const departmentFullName = (abbreviation) => {
        switch (abbreviation) {
            case 'LSPD':
                return 'Los Santos Police Department';
            case 'LSFD':
                return 'Los Santos Fire Department';
            case 'LSSD':
                return 'Los Santos Sheriff Department';
            case 'PHMC':
                return 'Pillbox Hill Medical Center';
            case 'SANFIRE':
                return 'San Andreas Department of Forestry and Fire Protection';
            case 'SADCR':
                return 'San Andreas Department of Corrections and Rehabilitation';
            case 'LSGOV':
                return 'Los Santos City Government';
            case '911 Call':
                return 'Emergency 911 Dispatch Center';
            default:
                return '';
        }
    };
    function getBrowserName(userAgent) {
        if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
            return "Google Chrome";
        } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
            return "Safari";
        } else if (userAgent.includes("Firefox")) {
            return "Mozilla Firefox";
        } else if (userAgent.includes("Edg")) {
            return "Microsoft Edge";
        } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
            return "Internet Explorer";
        } else {
            return "Unknown Browser";
        }
    }

    const generateDeath = () => {
        const {
            coronerRank,
            placeOfDeath,
            department,
            dateTime,
            coronerName,
            serialNumber,
            decedentName,
            pronouncedTimeOfDeath,
            synopsis,
            probableCauseOfDeath,
            mannerOfDeath,
            typeOfDeath,
            scenePhotos,
            additionalImages
        } = formData;

        const scenePhotosBBCode = scenePhotos.split(',').map(photo => `[img]${photo.trim()}[/img]`).join('\n');
        const additionalImagesBBCode = additionalImages.split(',').map(photo => `[img]${photo.trim()}[/img]`).join('\n');
        // Base BBCode for ID 1
        const bbCode = `[divbox=transparent][center][img]https://i.imgur.com/Hxjt4M2.png[/img][/center][/divbox]

[divbox=transparent][br][/br][center]DEATH INVESTIGATION REPORT[/center]
[hr][/hr]

[center][b]A. WRITTEN REPORT[/b][/center]

[list=none][color=transparent]spacer[/color]
The County Coroner's Office has been called regarding the decease that occurred at the location of [b]${placeOfDeath}[/b]. Upon receiving the call from[b] ${departmentFullName(department)}[/b], Coroner's Office dispatched a ${coronerRank} to the crime scene to conduct an investigation on the [b]${dateTime}[/b].

The ${coronerRank}, [b]${coronerName}[/b], Serial Number[b] ${serialNumber}[/b], arrived at the scene and identified the individual as[b]${decedentName}[/b], who was pronounced dead at [b]${pronouncedTimeOfDeath}[/b]. Following an initial investigation, The ${coronerRank} came up with the following [b]synopsis[/b]: ${synopsis}

Based on the information gathered from the scene investigation and the decedent's medical history (if available), the probable cause of death was determined to be [b]${probableCauseOfDeath}[/b]. The manner of death was classified as [b]${mannerOfDeath}[/b].
[/list]

[list=none][color=transparent]spacer[/color][center][b]B. PHOTOGRAPHIC DOCUMENTARY RECORD[/b][/center]

[divbox=transparent][center][size=85][b][u]SCENE PHOTOGRAPHY[/u][/b][/size][/center][hr][/hr]
${scenePhotosBBCode}
[/divbox]

[divbox=transparent][center][size=85][b][u](( OUT OF CHARACTER ))[/u][/b][/size][/center][hr][/hr]
[size=75] This section clarifies whether or not if the player was character killed or player killed. 
In this case the player was; ${typeOfDeath}

[morgue screen, cinjuries, cdna links: [/size]
${additionalImagesBBCode}
[/divbox]
[center][b]C. STATEMENT[/b][/center]

[divbox=transparent][center][size=85]As a ${coronerRank}, I have made detailed notes of my findings and conclusions, and these notes are available for review if necessary. However, I must note that these notes do not contain any personal opinions and are solely based on the evidence and facts available to me.

In conclusion, I hope that this report provides the necessary information required for the agency to move forward with any necessary actions. Please let me know if you require any additional information or if I can be of further assistance.

I certify that the information contained in this report is true and accurate to the best of my knowledge and belief. I have reviewed the report and ensured that all information included is complete and accurate. [/size][/divbox]

[center][b]D. PRIVACY AND CONFIDENTIALITY[/b][/center]

[divbox=transparent][center][size=85]This document from the Forensic Medicine and Pathology Department of Pillbox Hill Medical Center certifies the authenticity of the information contained within. Any unauthorized distribution or use of this information is in violation of the Health Insurance Portability and Accountability Act (HIPAA), as well as state and federal privacy laws, including but not limited to the San Andreas Confidentiality of Medical Information Act (CMIA) and the San Andreas Information Practices Act (IPA).

It is imperative that all parties handling this document respect the privacy and confidentiality of the decedent and their family. Any violation of these laws may result in legal action being taken against the responsible parties.

This document is provided for official purposes only and is not to be construed as legal advice or medical diagnosis. If additional information or clarification is needed, please contact the Forensic Medicine and Pathology Department of Pillbox Hill Medical Center.[/size][/divbox][/divbox]`;

        return bbCode;
    };

    const generateEmail = () => {
        const {
            requestingOfficer,
            department,
            coronerName,
            coronerRank,
            coronerDiscord,
            coronerPHNumber,
            deathReport,
            additionalReports,
        } = formData;

        // Base BBCode for ID 2
        let bbCode = `[center][img]https://i.imgur.com/ItaoQkO.png[/img][/center]
[hr][/hr]
    
TO: ${requestingOfficer} - ${department}
FROM: ${coronerName} @ phmc.health
SUBJECT: Death Report Paperwork

For the attention of: [b]${department}[/b] - [b]${requestingOfficer}[/b]

This Coroner Report has been written by ${coronerRank} ${coronerName} you can find the enclosed documents attached to this email. 

[b]AUTOPSY INFORMATION / REQUEST(S)[/B] 
If you require an autopsy, please follow this link and follow the instructions: [url=https://phmc.gta.world/viewforum.php?f=265]Autopsy Portal[/url].


[altspoiler=Request a Autopsy FAQ]
1) How do I request an autopsy report and/or a death certificate?
Autopsies and death certificates can aid in various situations, especially whenever the cause of death plays a vital role in. Our professionals attempt to handle each and every request in a timely manner. However, given the fact that the effort of documentation is immense, a request fee is associated along with it. Upon its payment, the report or certificate will be sent to you directly.


2) Is there a fee associated with the request process?
Yes, there is a $2,000 fee associated with the request. This fee covers administrative costs related to processing and maintaining your requested report/certificate securely within our systems. It ensures the continued improvement of our services, maintaining the highest standards in healthcare data management.


3) How do I pay the $2,000 request fee?
To pay your $2,000 request fee, please log into the banking website and navigate to the "Payment" section. Select your preferred payment method (e.g., credit card, debit card), insert our routing number (020000062), enter the required payment details, review the transaction, and confirm your payment. (( Type /transfer 2000 020000062 ))

(( Autopsies for Player Kills (PK) and Character Kills (CK) will only be accepted if they are deemed strictly necessary and relevant to an important case or investigation. Prior to making a request for such an autopsy, a member of the Medical-Examiners must be notified and consulted with. Furthermore, it is mandatory to provide information about /cdamages and /cexamine. In the event that this information is not available, please do not hesitate to contact an administrator in-game, who can provide it. If these steps are not followed, an automatic denial will cause your request to be archived.

Also if it is a PK, please be sure to use John/Jane Doe with their character name in OOC brackets . Ex: John Doe (( James Smith ))

[url=https://phmc.gta.world/ucp.php?i=pm&mode=compose&g=50]Click here to contact a Medical-Examiner to get the green light![/url] ))
[/altspoiler]
If you have further enquiries, feel free to reach out to the following individual:
[list] ${coronerName}
[*] Phone Number: ${coronerPHNumber}
[*] (( Discord: ${coronerDiscord} ))[/list]

[altspoiler=Coroner Report]
${deathReport}
[code]
${deathReport}
[/code]
[/altspoiler]
${additionalReports && additionalReports.length > 0
                ? additionalReports
                    .filter(report => report.trim())
                    .map((report, index) => `
[altspoiler=Additional Coroner Report #${index + 1}]
${report}
[code]
${report}
[/code]
[/altspoiler]`).join('\n\n')
                : ''
            }

Kind regards
${coronerRank} ${coronerName}
Pillbox Hill Medical Center - Pathology  and Forensic Medicine

[size=75]The content of this email is intended for the person or entity to which it is addressed only. This email may contain confidential information. If you are not the person to whom this message is addressed, be aware that any use, reproduction, or distribution of this message is strictly prohibited. If you received this in error, please contact the sender and immediately delete this email and any attachments.[/size]`;

        return bbCode;
    };
    // Medical Consultation (Internal Medicine) | Base BBCode for ID 3
    const generateMedicalConsultationInternalMedicine = () => {
        const {
            doctorName,
            patientName,
            patientMedicalRecord,
            patientGender,
            patientDateofBirth,
            patientEmail,
            patientAddress,
            patientEmergencyContact,
            patientEmergencyContactNumber,
            patientEmergencyContactRelation,
            patientBloodType,
            patientChronicDiseases,
            patientPH,
            patientAllergies,
        } = formData;


        let bbCode = `[divbox=white] [center] [img]https://i.imgur.com/bUn7H8J.png[/img] [/center] [/divbox]
[divbox=lightgrey] [color=#800000][b]Section 1. Medical Patient Record[/b][/color] [/divbox]
[divbox=white] [list=none] [b]1.1.[/b] Patient Number: ${patientMedicalRecord}
[b]1.2.[/b] Completed by: ${doctorName}
[/list][/divbox]
[divbox=lightgrey] [color=#800000][b]Section 2. Patient Demographics[/b][/color] [/divbox]
[divbox=white] [list=none] [b]2.1.[/b] Full Name: ${patientName}
[b]2.2.[/b] Sex: ${patientGender}
[b]2.3.[/b] Date Of Birth: ${patientDateofBirth}
[b]2.4.[/b] Telephone Number: ${patientPH}
[b]2.5.[/b] E-Mail: ${patientEmail}
[b]2.6.[/b] Home Address: ${patientAddress}
[/list][/divbox]
[divbox=lightgrey] [color=#800000][b]Section 3. Emergency Contact Information[/b][/color] [/divbox]
[divbox=white] [list=none] [b]3.1.[/b] Contact Name: ${patientEmergencyContact}
[b]3.2.[/b] Telephone Number: ${patientEmergencyContactNumber}
[b]3.3.[/b] Relation to Patient: ${patientEmergencyContactRelation}
[/list][/divbox]
[divbox=lightgrey] [color=#800000][b]Section 4. Health Status Information[/b][/color] [/divbox]
[divbox=white] [list=none] [b]4.1.[/b] Blood type: ${patientBloodType}
[b]4.2.[/b] Known Chronic Diseases: ${patientChronicDiseases}
[b]4.3.[/b] Known Allergies: ${patientAllergies}
[/list][/divbox]
`;

        return bbCode;
    };

    // Base BBCode for ID 4
    const generateDental = () => {
        const {
            PatientMedicalRecord,
            PatientName,
            patientWeight,
            patientChewing,
            patientPriority,
            patientMedicine,
            patientNewMedicine,
            patientTreatment,
            patientDiagnosis,
            patientPrescription,
            patientSummary,
            dentistName,
            date,
        } = formData;

        let bbCode = `[divbox=lightgrey][size=150]

[center][b]DEPARTMENT OF DENTAL MEDICINE[/b]
[color=#800000][b]DENTAL CONSULTATION[/b][/color][/center][/size]

[/divbox]

[divbox=lightgrey][b]SECTION 0: PERSONAL INFORMATION[/b][/divbox]
[divbox=white][table][tr][td][b]0.1[/b] Identifying
[/td][td]
[b]Medical Record Number:[/b] ${PatientMedicalRecord}
[b]Full Name:[/b] ${PatientName}
[b]Date Of Birth:[/b] ${PatientName}

[/table][/divbox]

[divbox=lightgrey][b]SECTION 1: PATIENT MEASUREMENTS[/b][/divbox]
[divbox=white][table][tr][td][b]1.1[/b] Weight[/td][td]
${patientWeight}

[tr][td][b]1.2[/b] Problems With Chewing & Swallowing[/td][td]
${patientChewing}

[/table][/divbox]

[divbox=lightgrey][b]SECTION 2: PRIORITY CLASSIFICATION[/b][/divbox]
[divbox=white][table][tr][td][b]2.1[/b] Priority Criteria [/td][td]
[cb][/cb] Priority 1: Immediate care
[cb][/cb] Priority 2: Extensive amount of decay
[cb][/cb] Priority 3: Obvious cavities
[cb][/cb] Priority 0: No obvious cavities
${patientPriority}
[/table][/divbox]

[divbox=lightgrey][b]SECTION 3: MEDICATIONS[/b][/divbox]
[divbox=white][table][tr][td][b]3.1[/b] Current Medications[/td][td]
${patientMedicine}

[tr][td][b]3.2[/b] New Medications[/td][td]
${patientNewMedicine}

[/table][/divbox]

[divbox=lightgrey][b]SECTION 4: DIAGNOSIS[/divbox]
[divbox=white][table]

[tr][td][b]4.1[/b] Mark Tooth Decay Area[/td][td]
[img]https://i.imgur.com/31wOMlD.jpeg[/img]

[tr][td][b]4.2[/b] Diagnosed With[/td][td]
${patientDiagnosis}

[tr][td][b]4.3[/b] Treatment[/td][td]
${patientTreatment}

[tr][td][b]4.4[/b] Prescription[/td][td]
${patientPrescription}

[/table][/divbox]

[divbox=lightgrey][b]SECTION 5: SUMMARY OF CONSULTATION[/b][/divbox]
[divbox=white][list=none]

${patientSummary}

[/divbox][divbox=lightgrey][b]SECTION 6: PERSON IN CHARGE OF THE CONSULTATION[/b][/divbox]

[divbox=white][table][tr][td][b]6.1[/b] Full Name (Signature)[/td][td] ${dentistName}
[tr][td][b]6.2[/b] Full Name (Print)[/td][td]${dentistName}
[tr][td][b]6.3[/b] Date[/td][td]${date}[/table][/divbox]`;

        return bbCode;
    };

    // Add new generation Surgical Ops function 5
    const generateSurgicalOps = () => {
        const {
            leadSurgeon,
            extraStaff,
            patientName,
            patientMedicine,
            patientConsent,
            patientMedicalRecord,
            patientAllergies,
            surgeryComplications,
            surgeryProcedures,
            drugType,
            postDrugtype,
            surgicalSummery,
            surgeryTime,
        } = formData;

        let bbCode = `[divbox=white] [center] [img]https://i.imgur.com/bUn7H8J.png[/img] [/center] [/divbox]
[divbox=lightgrey][size=150]

[center][b]OPERATIVE REPORT
PILLBOX HILL MEDICAL CENTER[/b]
[size=50][i]Elgin Avenue, Pillbox Hill, Los Santos, SA[/i][/size][/center][/size]

[/divbox][divbox=white][justify]

[divbox=lightgrey][b]SECTION 1: PERSONNEL[/b][/divbox]
[divbox=white][table][tr][td][b]1.1: [/b] Lead Surgeon[/td][td]
${leadSurgeon}
[/td][/tr]

[tr][td][b]1.2: [/b] Additional Staff (Leave N/A if NPCed)[/td][td]
${extraStaff}
[/td][/tr]

[tr][td][b]1.3: [/b] Patient Name[/td][td]
${patientName}
[/td][/tr]

[tr][td][b]1.3: [/b] Medical Record Number[/td][td]
${patientMedicalRecord}
[/td][/tr]

[/table][/divbox]

[divbox=lightgrey][b]SECTION 2: SURGICAL INQUIRY[/b][/divbox]
[divbox=white][table]

[tr][td][b]2.1: [/b]Did the patient or their family consent, or did they have a life threatening or severe injury that requires immediate surgical intervention?[/td][td]
${patientConsent}
[/td][/tr]

[tr][td][b]2.2: [/b]Did any medical complications occur during the surgery?[/td][td]
${surgeryComplications}
[/td][/tr]

[tr][td][b]2.3: [/b]Was the procedure completed successfully, and did it result in the desired clinical outcome?[/td][td]
${surgeryProcedures}
[/td][/tr]

[/table][/divbox]

[divbox=lightgrey][b]SECTION 3: POST-ANESTHESIA REPORT[/b][/divbox]
[divbox=white][table]

[tr][td][b]3.1: [/b]Known Current Medication:[/td][td]${patientMedicine}

[/td][/tr]

[tr][td][b]3.2: [/b]Known Allergies:[/td][td]${patientAllergies}

[/td][/tr]

[tr][td][b]3.3: [/b]Type & Dosage of Anesthesia Administered:[/td][td]${drugType}
[/td][/tr]

[tr][td][b]3.4: [/b]Post-Operative Anesthesia Details:[/td][td]${postDrugtype}
[/td][/tr]

[/table][/divbox]

[divbox=lightgrey][b]SECTION 4: SUMMARY OF SURGICAL PROCEDURE PERFORMED[/b][/divbox]
[divbox=white][list=none]

${surgicalSummery}

[/list][/divbox][divbox=lightgrey][b]SECTION 5: SIGNATURE OF THE LEAD SURGEON[/b][/divbox]

[divbox=white][table][tr][td][b]5.1[/b] Full name (Signature)[/td][td]${leadSurgeon}[/td][/tr]
[tr][td][b]5.2[/b] Full Name (Print)[/td][td]${leadSurgeon}
[tr][td][b]5.3[/b] Date of Surgery[/td][td]${surgeryTime}[/table][/divbox]
`;

        return bbCode;
    };

    // Base BBCode for ID 6 Physical Evaluation (Internal Medicine)

    const generatePhysEvalInternalMed = () => {
        const {
            leadDoctor,
            patientName,
            patientDateofBirth,
            patientGender,
            patientMedicine,
            patientAllergies,
            patientHeight,
            patientWeight,
            patientBMI,
            patientTemperature,
            patientBPM,
            patientpulse,
            patientOxi,
            patientBP,
            patientCareer,
            patientImpairments,
            patientPastDiseases,
            patientAssessment,
            appointmentDate,
            patientPH
        } = formData;

        let bbCode = `[divbox=white] [center] [img]https://i.imgur.com/bUn7H8J.png[/img] [/center] [/divbox]
[divbox=lightgrey][size=150]

[center][b]DEPARTMENT OF INTERNAL MEDICINE
PILLBOX HILL MEDICAL CENTER[/b]
[size=50][i]Elgin Avenue, Pillbox Hill, Los Santos, SA[/i][/size][/center][/size]

[/divbox][divbox=white][justify]

[i]To provide guidance for workforce members at Pillbox Hill Medical Center regarding the use and disclosure of Protected Health Information in accordance with applicable law. It is the policy that all Protected Health Information be used and disclosed in accordance with applicable San Andreas and federal law, and in the best interests of the patient. "Disclose" and "Disclosure" means the release of, transfer of, provision of, access to, or divulging in any manner, of Protected Health Information outside of Pillbox Hill Medical Center or to persons other than its workforce members. Disclosure means a release to persons or entities other than to the patient who is the subject of the information.[/i]


[/justify][/divbox]

[divbox=lightgrey][b]SECTION 0: PERSONAL INFORMATION[/b][/divbox]
[divbox=white][table][tr][td]Identifying
Information[/td][td]
[b]Name:[/b] ${patientName}
[b]DOB:[/b] ${patientDateofBirth}
[b]Sex:[/b] ${patientGender}
[b]Race:[/b]
[/td][/tr][tr][td]Contact
Information[/td]
[td][b]Telephone Number:[/b] ${patientPH}
[b]Email:[/b] 
[/td][/tr]
[tr][td]Examination
Information[/td][td]
[b]Date of Examination:[/b] ${appointmentDate}
[b]Personnel in Charge of Examination:[/b] ${leadDoctor}
[/td][/tr][/table][/divbox]

[divbox=lightgrey][b]SECTION 1: PATIENT MEASUREMENTS[/b][/divbox]
[divbox=white][table][tr][td][b]1.1[/b] Height[/td][td]
${patientHeight}
[/td][/tr]

[tr][td][b]1.2[/b] Weight[/td][td]
${patientWeight}
[/td][/tr]

[tr][td][b]1.3[/b] Body Mass Index[/td][td]
Index Value:
${patientBMI}
[/td][/tr]

[/table][/divbox]

[divbox=lightgrey][b]SECTION 2: VITALS[/b][/divbox]
[divbox=white][table][tr][td][b]2.1[/b] Body Temperature[/td][td]
${patientTemperature}
[/td][/tr]

[tr][td][b]2.2[/b] Heart Rate[/td][td]
${patientBPM} BPM
[/td][/tr]

[tr][td][b]2.3[/b] Respiration Rate[/td][td]
${patientpulse} BPM
[/td][/tr]

[tr][td][b]2.4[/b] Pulse Oximetry[/td][td]
${patientOxi} %
[/td][/tr]

[tr][td][b]2.5[/b] Blood Pressure[/td][td]
${patientBP} MMHG
[/td][/tr]

[/table][/divbox]

[divbox=lightgrey][b]SECTION 3: PATIENT ANAMNESIS[/b][/divbox]
[divbox=white][table]

[tr][td][b]3.1[/b] Patient had a job in the past[/td][td]
${patientCareer}
[/td][/tr]

[tr][td][b]3.2[/b] Were other medical condition(s) or physical impairments found that would preclude the patient from rigorous duties[/td][td]
${patientImpairments}
[/td][/tr]

[tr][td][b]3.3[/b] Patient has allergies/risks (implants, case of incompatibility, pacemaker, etc.)[/td][td]
${patientAllergies}
[/td][/tr]

[tr][td][b]3.4[/b] Patient takes medication on a regular basis[/td][td]
${patientMedicine}
[/td][/tr]

[tr][td][b]3.5[/b] Patient or family members have the following diseases: [/td][td]
${patientPastDiseases}
[/td][/tr]

[/table][/divbox]

[divbox=lightgrey][b]SECTION 4: ASSESSMENT SUMMARY[/b][/divbox]
[divbox=white][list=none]

${patientAssessment}
[/list][/divbox][divbox=lightgrey][b]SECTION 5: SIGNATURE OF PERSON IN CHARGE OF EXAMINATION[/b][/divbox]

[divbox=white][table][tr][td]Examiner's Signature:[/td][td]${leadDoctor}[/td][/tr][/table][/divbox]
`;

        return bbCode;
    };

    const generateMedicalConsultationInternalMedicine2 = () => {
        const {
            doctorName,
            patientName,
            patientMedicalRecord,
            patientResperation,
            patientDateofBirth,
            patientpulse,
            patientWeight,
            patientCurrentMedicine,
            patientNewMedicine,
            patientConsultation,
            patientTreatment,
            patientTemperature,
            patientBPM,
            patientBP,
            patientDiagnosis,
            patientSummaryConsultation,
            patientPerscription,
            patientHeight,
            doctorNameImage,
            date,
        } = formData;

        let bbCode = `[divbox=lightgrey][size=150]

[center][b]DEPARTMENT OF INTERNAL MEDICINE[/b]
[color=#800000][b]MEDICAL CONSULTATION[/b][/color][/center][/size]

[/divbox]

[divbox=lightgrey][b]SECTION 0: PERSONAL INFORMATION[/b][/divbox]
[divbox=white][table][tr][td][b]0.1[/b] Identifying
[/td][td]
[b]Medical Record Number:[/b] ${patientMedicalRecord}
[b]Full Name:[/b] ${patientName}
[b]Date Of Birth:[/b] ${patientDateofBirth}

[/table][/divbox]

[divbox=lightgrey][b]SECTION 1: PATIENT MEASUREMENTS[/b][/divbox]
[divbox=white][table][tr][td][b]1.1[/b] Height[/td][td]
${patientHeight}

[tr][td][b]1.2[/b] Weight[/td][td]
${patientWeight}

[/table][/divbox]

[divbox=lightgrey][b]SECTION 2: VITALS[/b][/divbox]
[divbox=white][table][tr][td][b]2.1[/b] Body Temperature[/td][td]
${patientTemperature}

[tr][td][b]2.2[/b] Heart Rate[/td][td]
${patientBPM}

[tr][td][b]2.3[/b] Respiration Rate[/td][td]
${patientResperation}

[tr][td][b]2.4[/b] Pulse Oximetry[/td][td]
${patientpulse}

[tr][td][b]2.5[/b] Blood Pressure[/td][td]
${patientBP}

[/table][/divbox]

[divbox=lightgrey][b]SECTION 3: MEDICATIONS[/b][/divbox]
[divbox=white][table][tr][td][b]3.1[/b] Current Medications[/td][td]
${patientCurrentMedicine}

[tr][td][b]3.2[/b] New Medications[/td][td]
${patientNewMedicine}

[/table][/divbox]

[divbox=lightgrey][b]SECTION 4: DIAGNOSIS[/divbox]
[divbox=white][table]

[tr][td][b]4.1[/b] Viewed For[/td][td]
${patientConsultation}

[tr][td][b]4.2[/b] Diagnosed With[/td][td]
${patientDiagnosis}

[tr][td][b]4.3[/b] Treatment[/td][td]
${patientTreatment}

[tr][td][b]4.4[/b] Prescription[/td][td]
${patientPerscription}

[/table][/divbox]

[divbox=lightgrey][b]SECTION 5: SUMMARY OF CONSULTATION[/b][/divbox]
[divbox=white][list=none]

${patientSummaryConsultation}

[/divbox][divbox=lightgrey][b]SECTION 6: PERSON IN CHARGE OF THE CONSULTATION[/b][/divbox]

[divbox=white][table][tr][td][b]6.1[/b] Full Name (Signature)[/td][td]${doctorNameImage}
[tr][td][b]6.2[/b] Full Name (Print)[/td][td]${doctorName}
[tr][td][b]6.3[/b] Date[/td][td]${date}[/table][/divbox]
`;

        return bbCode;
    };
    const generateMedConsultEmergencyMedForm = () => {
        const {
            patientEmergencyContact,
            patientEmergencyContactNumber,
            patientEmergencyContactRelation,
            patientPH,
            patientEmail,
            patientAddress,
            patientChronicDiseases,
            patientName,
            patientMedicalRecord,
            patientBloodType,
            patientDateofBirth,
            patientAllergies,
        } = formData;

        let bbCode = `[divbox=grey][center][img]https://i.imgur.com/s5acD6S.png[/img][/center][/divbox]
[divbox=lightgrey] [color=#800000][b]Section 1. Medical Patient Record[/b][/color] [/divbox]
[divbox=white] [list=none] [b]1.1.[/b] Patient Number: ${patientMedicalRecord}
[/list][/divbox]
[divbox=lightgrey] [color=#800000][b]Section 2. Patient Demographics[/b][/color] [/divbox]
[divbox=white] [list=none] [b]2.1.[/b] Full Name: ${patientName}
[b]2.2.[/b] Sex:
[list=none][cb]PUT CBC IF APPLICABLE[/cb] Male
[cb]PUT CBC IF APPLICABLE[/cb] Female[/list]
[b]2.3.[/b] Date Of Birth: ${patientDateofBirth}
[b]2.4.[/b] Telephone Number: ${patientPH}
[b]2.5.[/b] E-Mail: ${patientEmail}
[b]2.6.[/b] Home Address: ${patientAddress}
[/list][/divbox]
[divbox=lightgrey] [color=#800000][b]Section 3. Emergency Contact Information[/b][/color] [/divbox]
[divbox=white] [list=none] [b]3.1.[/b] Contact Name: ${patientEmergencyContact}
[b]3.2.[/b] Telephone Number: ${patientEmergencyContactNumber}
[b]3.3.[/b] Relation to Patient: ${patientEmergencyContactRelation}
[/list][/divbox]
[divbox=lightgrey] [color=#800000][b]Section 4. Health Status Information[/b][/color] [/divbox]
[divbox=white] [list=none] [b]4.1.[/b] Blood type: ${patientBloodType}
[b]4.2.[/b] Known Chronic Diseases: ${patientChronicDiseases}
[b]4.3.[/b] Known Allergies: ${patientAllergies}
[/list][/divbox]
    `;

        return bbCode;
    };
    const generateMedConsultEmergencyMedForm2 = () => {
        const {
            doctorName,
            patientName,
            patientMedicalRecord,
            patientResperation,
            patientCondition,
            patientDateofBirth,
            patientpulse,
            patientOxi,
            patientCurrentMedicine,
            patientNewMedicine,
            patientConsultation,
            patientTreatment,
            patientTemperature,
            patientNotes,
            patientBP,
            patientDiagnosis,
            patientSummaryConsultation,
            doctorNameImage,
            date,
        } = formData;

        let bbCode = `[divbox=lightgrey][size=150]

[center][b]DEPARTMENT OF EMERGENCY MEDICINE[/b]
[color=#800000][b]EMERGENCY CONSULTATION[/b][/color][/center][/size]

[/divbox]

[divbox=lightgrey][b]SECTION 0: PERSONAL INFORMATION[/b][/divbox]
[divbox=white][table][tr][td][b]0.1[/b] Identifying
[/td][td]
[b]Medical Record Number:[/b] ${patientMedicalRecord}
[b]Full Name:[/b] ${patientName}
[b]Date Of Birth:[/b] ${patientDateofBirth}

[/table][/divbox]

[divbox=lightgrey][b]SECTION 1: PATIENT'S CONDITION[/b][/divbox]
[divbox=white][table][tr][td][b]1.1[/b] State of consciousness[/td][td]
${patientCondition}
[/table][/divbox]

[divbox=lightgrey][b]SECTION 2: VITALS[/b][/divbox]
[divbox=white][table][tr][td][b]2.1[/b] Body Temperature[/td][td]
${patientTemperature}

[tr][td][b]2.2[/b] Heart Rate[/td][td]
${patientpulse}

[tr][td][b]2.3[/b] Respiration Rate[/td][td]
${patientResperation}

[tr][td][b]2.4[/b] Pulse Oximetry[/td][td]
${patientOxi}

[tr][td][b]2.5[/b] Blood Pressure[/td][td]
${patientBP}

[/table][/divbox]

[divbox=lightgrey][b]SECTION 3: MEDICATIONS[/b][/divbox]
[divbox=white][table][tr][td][b]3.1[/b] Current Medications[/td][td]
${patientCurrentMedicine}

[tr][td][b]3.2[/b] New Medications[/td][td]
${patientNewMedicine}

[/table][/divbox]

[divbox=lightgrey][b]SECTION 4: DIAGNOSIS[/divbox]
[divbox=white][table]

[tr][td][b]4.1[/b] Presenting Problems [size=80][color=#800000][i]Why is the patient here?[/i][/color][/size][/td][td]
${patientConsultation}

[tr][td][b]4.2[/b] Diagnosed With [size=80][color=#800000][i]What is the most likely diagnosis?[/i][/color][/size][/td][td]
${patientDiagnosis}

[tr][td][b]4.3[/b] Treatment/Epicrisis [size=80][color=#800000][i]What should be done? e.g. Admission, Procedures, Follow-up, Discharge and rest at home[/i][/color][/size][/td][td]
${patientTreatment}

[tr][td][b]4.4[/b] Additionals [size=80][color=#800000][i]Lab results, allergies, physicial condition, pre-existing diseases[/i][/color][/size][/td][td]
${patientNotes}

[/table][/divbox]

[divbox=lightgrey][b]SECTION 5: SUMMARY OF CONSULTATION[/b][/divbox]
[divbox=white][list=none]

${patientSummaryConsultation}

[/divbox]

[divbox=lightgrey][b]SECTION 6: PERSON IN CHARGE OF THE CONSULTATION[/b][/divbox]

[divbox=white][table][tr][td][b]7.1[/b] Full Name (Signature)[/td][td]${doctorNameImage}
[tr][td][b]7.2[/b] Full Name (Print)[/td][td]${doctorName}
[tr][td][b]7.3[/b] Date[/td][td]${date}[/table][/divbox]
    `;

        return bbCode;
    };

    // Update BBCode generation logic
    const bbCode = bbCodeVersion === 1 ? generateDeath() :
        bbCodeVersion === 2 ? generateEmail() :
            bbCodeVersion === 3 ? generateMedicalConsultationInternalMedicine() :
                bbCodeVersion === 4 ? generateDental() :
                    bbCodeVersion === 5 ? generateSurgicalOps() :
                        bbCodeVersion === 6 ? generatePhysEvalInternalMed() :
                            bbCodeVersion === 7 ? generateMedicalConsultationInternalMedicine2() :
                                bbCodeVersion == 8 ? generateMedConsultEmergencyMedForm() :
                                    generateDental();

    const generateTitle = () => {
        if (bbCodeVersion === 1) {
            const { typeOfDeath, decedentName, decedentOOC, dateTime } = formData;
            const date = new Date(dateTime).toLocaleDateString('en-US');
            return `[${typeOfDeath}] ${decedentName} ((${decedentOOC})) - ${date}`;
        } else {
            const { decedentName, decedentOOC } = formData;
            return `Coroner Report - ${decedentName} | ((${decedentOOC}))`;
        }
    };

    const clearForm = () => {
        setFormData({
            coronerRank: 'Forensic Attendant',
            placeOfDeath: '',
            department: '',
            dateTime: '',
            coronerName: '',
            serialNumber: '',
            decedentName: '',
            pronouncedTimeOfDeath: '',
            synopsis: '',
            probableCauseOfDeath: '',
            mannerOfDeath: '',
            typeOfDeath: 'PK',
            decedentOOC: '',
            scenePhotos: '',
            additionalImages: '',
            requestingOfficer: '',
            coronerDiscord: '',
            coronerPHNumber: '50056',
            deathReport: '',
            additionalReports: [],
            internalReport: '',
            internalAdditionalReports: '',
            policeNotification: '',
            partiesInvolved: [''],
            treatmentLocation: '',
            moreDeathReports: [''],
            leadSurgeon: '',
            extraStaff: '',
            patientName: '',
            patientMedicine: '',
            patientConsent: '',
            patientMedicalRecord: '',
            patientAllergies: '',
            surgeryComplications: '',
            surgeryProcedures: '',
            drugType: '',
            postDrugtype: '',
            surgicalSummery: '',
            surgeryTime: '',
            leadDoctor: '',
            medicalComplications: '',
            treatmentProcedures: '',
            medType: '',
            postTreatment: '',
            medicalSummary: '',
            evalTime: '',
            patientHeight: '',
            patientWeight: '',
            patientBMI: '',
            patientTemperature: '',
            patientBPM: '',
            patientpulse: '',
            patientOxi: '',
            patientBP: '',
            patientCareer: '',
            patientImpairments: '',
            patientPastDiseases: '',
            patientAssessment: '',
            appointmentDate: '',
            patientPH: '',
            patientGender: '',
            PatientMedicalRecord: '',
            PatientName: '',
            patientChewing: '',
            patientPriority: '',
            patientNewMedicine: '',
            patientTreatment: '',
            patientDiagnosis: '',
            patientPrescription: '', // Missing in original
            patientSummary: '',
            dentistName: '',
            date: '',
            teethCondition: '', // New field for dental condition
            oralHygiene: '',   // New field for hygiene status
            lastDentalVisit: '', // New field for last visit
            // New fields for Medical Consultation Internal Medicine 2
            patientResperation: '',
            patientConsultation: '',
            patientPerscription: '',
            patientSummaryConsultation: '',
            doctorNameImage: '',
            patientCondition: '',
            patientNotes: '',
        });
        showNotification('Form cleared successfully!', 'check-circle');
    };

    const showNotification = (message, icon = 'check-circle') => {
        setNotification({
            message,
            icon
        });

        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    // Update toggle function
    const toggleBBCodeVersion = () => {
        setBbCodeVersion(prev => {
            const newVersion = prev === 1 ? 2 : prev === 2 ? 3 : prev === 3 ? 4 : prev === 4 ? 5 : prev === 5 ? 6 : 1;
            const messages = {
                1: 'Death Investigation Report',
                2: 'Email Generator',
                3: 'Physical Evaluation (Internal Medicine)',
                4: 'Internal Dental',
                5: 'Surgical Operations',
                6: 'Physical Evaluation (Internal Medicine)'
            };
            showNotification(`Switched to ${messages[newVersion]}`, 'exchange-alt');
            return newVersion;
        });
    };

    const addParty = () => {
        setFormData(prev => ({
            ...prev,
            partiesInvolved: [...prev.partiesInvolved, '']
        }));
    };

    const handlePartyChange = (index, value) => {
        setFormData(prev => {
            const newParties = [...prev.partiesInvolved];
            newParties[index] = value;
            return {
                ...prev,
                partiesInvolved: newParties
            };
        });
    };

    // Add removeParty function
    const removeParty = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            partiesInvolved: prev.partiesInvolved.filter((_, index) => index !== indexToRemove)
        }));
    };

    // Add new state
    const [parsedBBCode, setParsedBBCode] = useState('');

    // Add parse function
    const parseBBCode = () => {
        const bbCode = generateDeath();
        setParsedBBCode(bbCode);
        setFormData(prev => ({
            ...prev,
            deathReport: bbCode
        }));
        showNotification('BBCode parsed and copied to Death Report field!', 'check-circle');
    };

    // Add clear function
    const clearParsedBBCode = () => {
        setParsedBBCode('');
        setFormData(prev => ({
            ...prev,
            deathReport: ''
        }));
        showNotification('Parsed BBCode cleared!', 'trash-alt');
    };

    // Add functions to handle reports
    const addDeathReport = () => {
        setFormData(prev => ({
            ...prev,
            moreDeathReports: [...prev.moreDeathReports, '']
        }));
    };

    const removeDeathReport = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            moreDeathReports: prev.moreDeathReports.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleDeathReportChange = (index, value) => {
        setFormData(prev => {
            const newReports = [...prev.moreDeathReports];
            newReports[index] = value;
            return {
                ...prev,
                moreDeathReports: newReports
            };
        });
    };

    // Add functions to handle additional reports
    const addReport = () => {
        setFormData(prev => ({
            ...prev,
            additionalReports: [...prev.additionalReports, '']
        }));
    };

    const removeReport = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            additionalReports: prev.additionalReports.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleReportChange = (index, value) => {
        setFormData(prev => {
            const newReports = [...prev.additionalReports];
            newReports[index] = value;
            return {
                ...prev,
                additionalReports: newReports
            };
        });
    };

    // Add new state
    const [showAgencySelector, setShowAgencySelector] = useState(true);
    const [hideAgencySelector, setHideAgencySelector] = useState(localStorage.getItem('hideAgencySelector') === 'true');

    useEffect(() => {
        setShowAgencySelector(!hideAgencySelector);
    }, [hideAgencySelector]);

    const handleHideSelector = (e) => {
        const isChecked = e.target.checked;
        setHideAgencySelector(isChecked);
        localStorage.setItem('hideAgencySelector', isChecked);
    };

    // Add agency selection handler
    const handleAgencySelect = (version) => {
        setBbCodeVersion(version);
        setShowAgencySelector(false);
        showNotification(`Switched to version ${version}`, 'exchange-alt');
    };

    const toggleAgencySelector = () => {
        setShowAgencySelector(prev => !prev);
    };

    // Add state near other useState declarations
    const [showBBCode, setShowBBCode] = useState(false);

    // Add modal to the start of return statement
    return (
        <div className="App">
            {showAgencySelector && (
                <div className="modal-overlay">
                    <div className="agency-selector-modal">
                        <div className="modal-header">
                            <h2>Select Your Department</h2>
                            <button
                                className="close-button"
                                onClick={() => setShowAgencySelector(false)}
                                aria-label="Close selector"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="agency-selector-buttons">
                            <div className="agency-row">
                                <button
                                    className="agency-select-button"
                                    onClick={() => handleAgencySelect(1)} // Death Report 
                                >
                                    <i className="fa-solid fa-book-skull" style={{ fontSize: '2rem', color: '#dc3545' }}></i>
                                    <span>Death Report</span>
                                </button>
                                <button
                                    className="agency-select-button"
                                    onClick={() => handleAgencySelect(2)} // Email Generator
                                >
                                    <i className="fa-solid fa-inbox" style={{ fontSize: '2rem', color: '#dc3545' }}></i>
                                    <span>Email Generator</span>
                                </button>
                                <button
                                    className="agency-select-button"
                                    onClick={() => handleAgencySelect(3)} // Medical Consultation Internal Medicine
                                >
                                    <i className="fa-solid fa-user-nurse" style={{ fontSize: '2rem', color: '#dc3545' }}></i>
                                    <span>Medical Consultation Forms [IM] </span>
                                </button>
                                <button
                                    className="agency-select-button"
                                    onClick={() => handleAgencySelect(8)} // Emergency Medical Consultation
                                >
                                    <i className="fa-solid fa-user-doctor" style={{ fontSize: '2rem', color: '#dc3545' }}></i>
                                    <span>Medical Consultation [EM]</span>
                                </button>
                            </div>
                            <div className="agency-row">
                                <button
                                    className="agency-select-button"
                                    onClick={() => handleAgencySelect(6)} // Physical Evaluation (Internal Medicine)
                                >
                                    <i className="fa-solid fa-user-doctor" style={{ fontSize: '2rem', color: '#dc3545' }}></i>
                                    <span>Physical Evaluation (IM)
                                    </span>
                                </button>
                                <button
                                    className="agency-select-button"
                                    onClick={() => handleAgencySelect(5)}
                                >
                                    <i className="fa-solid fa-user-doctor" style={{ fontSize: '2rem', color: '#dc3545' }}></i>
                                    <span>Surgical Operations </span>
                                </button>
                                <button
                                    className="agency-select-button"
                                    onClick={() => handleAgencySelect(8)}
                                >
                                    <i className="fa-solid fa-user-doctor" style={{ fontSize: '2rem', color: '#dc3545' }}></i>
                                    <span>NULL </span>
                                </button>
                                <button
                                    className="agency-select-button"
                                    onClick={() => handleAgencySelect(7)}
                                >
                                    <i className="fa-solid fa-user-doctor" style={{ fontSize: '2rem', color: '#dc3545' }}></i>
                                    <span>Other - NOT FINISHED </span>
                                </button>

                            </div>
                        </div>
                        <div className="hide-selector-option">
                            <input
                                type="checkbox"
                                id="hideSelector"
                                checked={hideAgencySelector}
                                onChange={handleHideSelector}
                            />
                            <label htmlFor="hideSelector">Don't show this popup again</label>
                        </div>
                    </div>
                </div>
            )}
            <div className="header-info-wrapper">
                <div className="header-info">
                    {commitInfo.date && (
                        <>
                            <span className="version-info">
                                <a href="https://github.com/LPX-Dev/phmc-death-report/tree/gh-pages" target="_blank" rel="noopener noreferrer">
                                    This website was last updated on {commitInfo.date} with version #{commitInfo.sha}</a>
                            </span>
                            <span className="contact-info">
                                Need help? Contact Alyson Frost on <a
                                    href="http://discord.gg/rrzJ4EeHfK"
                                    className="discord-link"
                                >
                                    Discord <i className="fab fa-discord"></i>
                                </a>
                            </span>
                        </>
                    )}
                </div>
            </div>
            <div className="container">
                <div className="form-container">
                    <button
                        type="button"
                        className="changelog-button"
                        onClick={() => setShowChangelog(true)}
                    >
                        <i className="fas fa-history"></i>
                        View Changelog
                    </button>

                    {showChangelog && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <div className="modal-header">
                                    <h3>Changelog - Version 2.2</h3>
                                    <button
                                        className="close-button"
                                        onClick={() => setShowChangelog(false)}
                                        aria-label="Close changelog"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                <div className="modal-content">
                                    <ul>
                                        <li>To do -  Medical Consultation (EM) | OBY GYNE | Additional Docs</li>
                                        <li>Added QOL features</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                    <a href="https://github.com/LPX-Dev/phmc-death-report/tree/gh-pages" target="_blank" rel="noopener noreferrer">
                        <h5>This website is fully open source and was made by Fr0sty, you can report bugs in the PHMC Discord.</h5></a>
                    <div className="button-group">
                        <button
                            type="button"
                            className="changelog-button"
                            onClick={() => window.open('https://phmc.gta.world/viewforum.php?f=255', '_blank')}
                        >
                            <i className="fas fa-hospital"></i>
                            PHMC
                        </button>
                        <button
                            className="changelog-button"
                            onClick={toggleAgencySelector}
                        >
                            <i className="fas fa-exchange-alt"></i>
                            Switch Department
                        </button>

                        {/* Button switches between forms */}
                        {(bbCodeVersion === 3 || bbCodeVersion === 7) && (
                            <button
                                type="button"
                                className="changelog-button"
                                onClick={() => setBbCodeVersion(bbCodeVersion === 3 ? 7 : 3)}
                            >
                                <i className="fas fa-exchange-alt"></i>
                            Switch Form to: {bbCodeVersion === 3 ? "Add To Medical File" : "New Medical File"}
                            </button>
                        )}

                        {(bbCodeVersion === 8 || bbCodeVersion === 9) && (
                            <button
                                type="button"
                                className="changelog-button"
                                onClick={() => setBbCodeVersion(bbCodeVersion === 8 ? 9 : 8)}
                            >
                                <i className="fas fa-exchange-alt"></i>
                                Switch Forms {bbCodeVersion === 8 ? "Add To File" : "New Patient File"}
                            </button>
                        )}
                    </div>
                    {notification && (
                        <Notification
                            message={notification.message}
                            icon={notification.icon}
                            onDismiss={() => setNotification(null)}
                        />
                    )}
                    <form>
                        {bbCodeVersion === 1 ? (
                            <>
                                <p>The Coroner Report Generated needs to be filled out fully, you can upload images locally or link pictures. </p>
                                <Form.Group className="mb-3">
                                    <Form.Label>Dispatch Date and Time:</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="dateTime"
                                        value={formData.dateTime}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <div className="radio-inline-container">
                                        <span className="radio-text">Decedent Name:</span>
                                        <div className="radio-button-group">
                                            <Form.Check
                                                type="radio"
                                                id="johnDoe"
                                                label="John Doe"
                                                checked={isJohnDoe}
                                                onChange={handleDoeChange('john')}
                                                inline
                                            />
                                            <Form.Check
                                                type="radio"
                                                id="janeDoe"
                                                label="Jane Doe"
                                                checked={isJaneDoe}
                                                onChange={handleDoeChange('jane')}
                                                inline
                                            />
                                        </div>
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        name="decedentName"
                                        value={formData.decedentName}
                                        onChange={handleChange}
                                        rows="1"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Decedent's Name ((OOC)):</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="decedentOOC"
                                        value={formData.decedentOOC}
                                        onChange={handleChange}
                                        placeholder="John Snow"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Type of Death:</Form.Label>
                                    <Form.Select
                                        name="typeOfDeath"
                                        value={formData.typeOfDeath}
                                        onChange={handleChange}
                                        required
                                        className="form-select"
                                    >
                                        <option value="PK">PK</option>
                                        <option value="CK">CK</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Place of Death:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="placeOfDeath"
                                        value={formData.placeOfDeath}
                                        onChange={handleChange}
                                        placeholder="Mirror Park"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Pronounced Time of Death:</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="pronouncedTimeOfDeath"
                                        value={formData.pronouncedTimeOfDeath}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Brief Summary:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="synopsis"
                                        value={formData.synopsis}
                                        onChange={handleChange}
                                        rows="4"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Probable Cause of Death:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="probableCauseOfDeath"
                                        value={formData.probableCauseOfDeath}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Manner of Death:</Form.Label>
                                    <Form.Select
                                        name="mannerOfDeath"
                                        value={formData.mannerOfDeath}
                                        onChange={handleChange}
                                        required
                                        className="form-select"
                                    >
                                        <option value="" disabled>Select Manner</option>
                                        <option value="Natural">Natural - the death resulted from natural causes, such as disease or old age.</option>
                                        <option value="Accident">Accidental - the death resulted from an unintentional or unexpected event, such as a car accident or drug overdose.</option>
                                        <option value="Suicide">Suicide - the death resulted from a self-inflicted injury with the intention to end ones life.</option>
                                        <option value="Homicide">Homicide - the death resulted from the intentional actions of another person, such as a murder, manslaughter and/or legally justified means such as self defense. </option>
                                        <option value="Undetermined">Undetermined - the evidence is insufficient to determine the manner of death</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Requesting Agency:</Form.Label>
                                    <Form.Select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        required
                                        className="form-select"
                                    >
                                        <option value="" disabled>Select Department</option>
                                        <option value="LSFD">LSFD</option>
                                        <option value="LSPD">LSPD</option>
                                        <option value="LSSD">LSSD</option>
                                        <option value="PHMC">PHMC</option>
                                        <option value="SANFIRE">SANFIRE</option>
                                        <option value="SADCR">SADCR</option>
                                        <option value="LSGOV">LSGOV</option>
                                        <option value="911 Call">Emergency 911 Dispatch</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Coroner Name:</Form.Label>
                                    <Form.Select
                                        name="coronerName"
                                        value={formData.coronerName}
                                        onChange={handleChange}
                                        required
                                        className="form-select"
                                    >
                                        <option value="">Select Coroner</option>
                                        {coronerList.map(coroner => (
                                            <option key={coroner.badge} value={coroner.name}>
                                                {coroner.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Job Classification:</Form.Label>
                                    <Form.Select
                                        name="coronerRank"
                                        value={formData.coronerRank}
                                        onChange={handleChange}
                                        required
                                        className="form-select"
                                    >
                                        <option value="Trainee Forensic Attendant">Trainee Forensic Attendant</option>
                                        <option value="Forensic Attendant">Forensic Attendant</option>
                                        <option value="Senior Forensic Attendant">Senior Forensic Attendant </option>
                                        <option value="Supervising Forensic Attendant">Supervising Forensic Attendant</option>
                                        <option value="Coroner Investigator">Coroner Investigator</option>
                                        <option value="Supervising Coroner Investigator">Supervising Coroner Investigator</option>
                                        <option value="Medical Examiner">Medical Examiner</option>
                                        <option value="Supervising Medical Examiner">Supervising Medical Examiner</option>
                                        <option value="Deputy Chief Medical Examiner">Deputy Chief Medical Examiner</option>
                                        <option value="Chief Medical Examiner">Chief Medical Examiner</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Badge Number:
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="serialNumber"
                                        value={formData.serialNumber}
                                        onChange={handleChange}
                                        placeholder="Enter or select coroner for auto-fill"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 upload-container">
                                    <Form.Label>
                                        Scene Photos Links (comma-separated):
                                    </Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            as="textarea"
                                            name="scenePhotos"
                                            value={formData.scenePhotos}
                                            onChange={handleChange}
                                            rows="2"
                                            required
                                            className="form-control"
                                        />
                                        <Button
                                            variant="success"
                                            disabled={isUploading}
                                            onClick={() => {
                                                const input = document.createElement('input');
                                                input.type = 'file';
                                                input.accept = 'image/*';
                                                input.multiple = true;
                                                input.onchange = (e) => handleImageUpload(e, 'scenePhotos');
                                                input.click();
                                            }}
                                        >
                                            <i className={`fas ${isUploading ? 'fa-spinner fa-spin' : 'fa-upload'}`}></i>
                                            {isUploading ? 'Uploading...' : 'Upload Images'}
                                        </Button>

                                    </InputGroup>
                                    <span className="helper-text">
                                        Hosted by ImgBB! - <a href="https://imgbb.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                                    </span>
                                </Form.Group>
                                <Form.Group className="mb-3 upload-container">
                                    <Form.Label>
                                        Morgue Screen, Cinjuries, CDNA Links (comma-separated)
                                    </Form.Label>

                                    <div className="input-group">
                                        <Form.Control
                                            as="textarea"
                                            name="additionalImages"
                                            value={formData.additionalImages}
                                            onChange={handleChange}
                                            rows="2"
                                            required
                                            className="form-control"
                                        />
                                        <Button
                                            variant="success"
                                            disabled={isUploading}
                                            onClick={() => {
                                                const input = document.createElement('input');
                                                input.type = 'file';
                                                input.accept = 'image/*';
                                                input.multiple = true;
                                                input.onchange = (e) => handleImageUpload(e, 'additionalImages');
                                                input.click();
                                            }}
                                        >
                                            <i className={`fas ${isUploading ? 'fa-spinner fa-spin' : 'fa-upload'}`}></i>
                                            {isUploading ? 'Uploading...' : 'Upload Images'}
                                        </Button>
                                    </div>
                                    <span className="helper-text">
                                        Hosted by ImgBB! - <a href="https://imgbb.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                                    </span>

                                </Form.Group>
                            </>
                        ) : bbCodeVersion === 2 ? (
                            <>
                                <p>This generator prefills most of the forms for you, take a moment to review the BBCode prior to sending!</p>
                                <Form.Group className="mb-3">
                                    <Form.Label>Officer Name or Badge Number:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="requestingOfficer"
                                        value={formData.requestingOfficer}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Requesting Agency:</Form.Label>
                                    <Form.Select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        required
                                        className="form-select"
                                    >
                                        <option value="" disabled>Select Department</option>
                                        <option value="LSFD">LSFD</option>
                                        <option value="LSPD">LSPD</option>
                                        <option value="LSSD">LSSD</option>
                                        <option value="PHMC">PHMC</option>
                                        <option value="SANFIRE">SANFIRE</option>
                                        <option value="SADCR">SADCR</option>
                                        <option value="LSGOV">LSGOV</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Coroner Name:</Form.Label>
                                    <Form.Select
                                        name="coronerName"
                                        value={formData.coronerName}
                                        onChange={handleChange}
                                        required
                                        className="form-select"
                                    >
                                        <option value="">Select Coroner</option>
                                        {coronerList.map(coroner => (
                                            <option key={coroner.badge} value={coroner.name}>
                                                {coroner.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Job Classification:</Form.Label>
                                    <Form.Select
                                        name="coronerRank"
                                        value={formData.coronerRank}
                                        onChange={handleChange}
                                        required
                                        className="form-select"
                                    >
                                        <option value="Trainee Forensic Attendant">Trainee Forensic Attendant</option>
                                        <option value="Forensic Attendant">Forensic Attendant</option>
                                        <option value="Senior Forensic Attendant">Senior Forensic Attendant </option>
                                        <option value="Supervising Forensic Attendant">Supervising Forensic Attendant</option>
                                        <option value="Coroner Investigator">Coroner Investigator</option>
                                        <option value="Supervising Coroner Investigator">Supervising Coroner Investigator</option>
                                        <option value="Medical Examiner">Medical Examiner</option>
                                        <option value="Supervising Medical Examiner">Supervising Medical Examiner</option>
                                        <option value="Deputy Chief Medical Examiner">Deputy Chief Medical Examiner</option>
                                        <option value="Chief Medical Examiner">Chief Medical Examiner</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Coroner Contact Number:
                                    </Form.Label>
                                    <span className="helper-text">
                                        (By default PHMC Landline is added, if you have a work number please add it)
                                    </span>

                                    <Form.Control
                                        as="textarea"
                                        name="coronerPHNumber"
                                        value={formData.coronerPHNumber}
                                        onChange={handleChange}
                                        rows="1"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Coroner Discord Name:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="coronerDiscord"
                                        value={formData.coronerDiscord}
                                        onChange={handleChange}
                                        rows="1"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Decedent(s) Names:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="decedentName"
                                        value={formData.decedentName}
                                        onChange={handleChange}
                                        rows="1"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Decedent OOC Name:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="decedentOOC"
                                        value={formData.decedentOOC}
                                        onChange={handleChange}
                                        rows="1"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Paste Death Report BBCode:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="deathReport"
                                        value={formData.deathReport}
                                        onChange={handleChange}
                                        rows="4"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Additional Reports:</Form.Label>
                                    <div className="reports-container">
                                        {formData.additionalReports.map((report, index) => (
                                            <div key={index} className="report-input">
                                                <Form.Control
                                                    as="textarea"
                                                    value={report}
                                                    onChange={(e) => handleReportChange(index, e.target.value)}
                                                    placeholder="Paste additional coroner report here"
                                                    rows="4"
                                                    className="form-control"
                                                />
                                                <Button
                                                    variant="danger"
                                                    onClick={() => removeReport(index)}
                                                    className="remove-report-button"
                                                >
                                                    REMOVE REPORT
                                                </Button>
                                            </div>
                                        ))}
                                        <div className="email-buttons">
                                            <Button
                                                variant="success"
                                                onClick={addReport}
                                                className="email-button"
                                            >
                                                <i className="fas fa-plus"></i> Add Report
                                            </Button>
                                            <Button
                                                variant="primary"
                                                onClick={parseBBCode}
                                                className="email-button"
                                            >
                                                <i className="fas fa-copy"></i> Parse BBCode
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={clearParsedBBCode}
                                                className="remove-report-button"
                                            >
                                                <i className="fas fa-times"></i> Clear BBCode
                                            </Button>
                                            <Button
                                                variant="warning"
                                                onClick={clearForm}
                                                className="remove-report-button"
                                            >
                                                <i className="fas fa-trash-alt"></i> Clear Form
                                            </Button>
                                        </div>

                                    </div>
                                </Form.Group>
                            </>
                        ) : bbCodeVersion === 3 ? (
                            <>
                                <p>The FORM below is intended for the opening of a medical file, it must appear at the top.</p>
                                <Form.Group className="mb-3">
                                    <Form.Label>Section 1: Medical Patient Record</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientMedicalRecord"
                                        value={formData.patientMedicalRecord}
                                        onChange={handleChange}
                                        placeholder="Patient Number"
                                        required
                                    />
                                    <Form.Control
                                        type="text"
                                        name="doctorName"
                                        value={formData.doctorName}
                                        onChange={handleChange}
                                        placeholder="Doctor's Name"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Section 2: Patient Demographics</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientName"
                                        value={formData.patientName}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        required
                                    />
                                    <Form.Select
                                        name="patientGender"
                                        value={formData.patientGender}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Form.Select>
                                    <Form.Text className="text-muted">
                                        Patient's date of birth
                                    </Form.Text>
                                    <Form.Control
                                        type="date"
                                        name="patientDateofBirth"
                                        value={formData.patientDateofBirth}
                                        onChange={handleChange}
                                        placeholder="Date of Birth"
                                        required
                                    />
                                    <Form.Control
                                        type="tel"
                                        name="patientPH"
                                        value={formData.patientPH}
                                        onChange={handleChange}
                                        placeholder="Telephone Number"
                                        required
                                    />
                                    <Form.Control
                                        type="email"
                                        name="patientEmail"
                                        value={formData.patientEmail}
                                        onChange={handleChange}
                                        placeholder="Email Address / ((Include a Discord handle if available))"
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientAddress"
                                        value={formData.patientAddress}
                                        onChange={handleChange}
                                        placeholder="Home Address"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Section 3: Emergency Contact Information</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientEmergencyContact"
                                        value={formData.patientEmergencyContact}
                                        onChange={handleChange}
                                        placeholder="Emergency Contact Name"
                                        required
                                    />
                                    <Form.Control
                                        type="tel"
                                        name="patientEmergencyContactNumber"
                                        value={formData.patientEmergencyContactNumber}
                                        onChange={handleChange}
                                        placeholder="Emergency Contact Number"
                                        required
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientEmergencyContactRelation"
                                        value={formData.patientEmergencyContactRelation}
                                        onChange={handleChange}
                                        placeholder="Relation to Patient"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Section 4: Health Status Information</Form.Label>
                                    <Form.Select
                                        name="patientBloodType"
                                        value={formData.patientBloodType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Blood Type</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </Form.Select>
                                    <Form.Control
                                        as="textarea"
                                        name="patientChronicDiseases"
                                        value={formData.patientChronicDiseases}
                                        onChange={handleChange}
                                        placeholder="Known Chronic Diseases"
                                        rows="2"
                                    />
                                    <Form.Control
                                        as="textarea"
                                        name="patientAllergies"
                                        value={formData.patientAllergies}
                                        onChange={handleChange}
                                        placeholder="Known Allergies"
                                        rows="2"
                                    />
                                </Form.Group>
                            </>
                        ) : bbCodeVersion === 4 ? (
                            // Dental Consultation fields
                            <>
                                <p>The generated form must be used and added to the file for each medical appointment, follow the others.</p>
                                <Form.Group className="mb-3">
                                    <Form.Label>Patient Information</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="PatientMedicalRecord"
                                        value={formData.PatientMedicalRecord}
                                        onChange={handleChange}
                                        placeholder="Medical Record Number"
                                        required
                                    />
                                    <Form.Control
                                        type="text"
                                        name="PatientName"
                                        value={formData.PatientName}
                                        onChange={handleChange}
                                        placeholder="Patient Full Name"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Physical Assessment</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientWeight"
                                        value={formData.patientWeight}
                                        onChange={handleChange}
                                        placeholder="Weight"
                                        required
                                    />
                                    <Form.Select
                                        name="patientChewing"
                                        value={formData.patientChewing}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Chewing Problems</option>
                                        <option value="No Issues">No Issues</option>
                                        <option value="Mild Difficulty">Mild Difficulty</option>
                                        <option value="Moderate Difficulty">Moderate Difficulty</option>
                                        <option value="Severe Difficulty">Severe Difficulty</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Priority Classification</Form.Label>
                                    <Form.Select
                                        name="patientPriority"
                                        value={formData.patientPriority}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Priority Level</option>
                                        <option value="Priority 1">Priority 1: Immediate care</option>
                                        <option value="Priority 2">Priority 2: Extensive decay</option>
                                        <option value="Priority 3">Priority 3: Obvious cavities</option>
                                        <option value="Priority 0">Priority 0: No obvious cavities</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Medications</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="patientMedicine"
                                        value={formData.patientMedicine}
                                        onChange={handleChange}
                                        placeholder="Current Medications"
                                        rows="2"
                                    />
                                    <Form.Control
                                        as="textarea"
                                        name="patientNewMedicine"
                                        value={formData.patientNewMedicine}
                                        onChange={handleChange}
                                        placeholder="Prescribed Medications"
                                        rows="2"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Diagnosis & Treatment</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="patientDiagnosis"
                                        value={formData.patientDiagnosis}
                                        onChange={handleChange}
                                        placeholder="Diagnosis"
                                        rows="3"
                                        required
                                    />
                                    <Form.Control
                                        as="textarea"
                                        name="patientTreatment"
                                        value={formData.patientTreatment}
                                        onChange={handleChange}
                                        placeholder="Treatment Plan"
                                        rows="3"
                                        required
                                    />
                                    <Form.Control
                                        as="textarea"
                                        name="patientPrescription"
                                        value={formData.patientPrescription}
                                        onChange={handleChange}
                                        placeholder="Prescriptions"
                                        rows="2"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Consultation Summary</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="patientSummary"
                                        value={formData.patientSummary}
                                        onChange={handleChange}
                                        placeholder="Summary of Consultation"
                                        rows="4"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Dentist Information</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="dentistName"
                                        value={formData.dentistName}
                                        onChange={handleChange}
                                        placeholder="Dentist Name"
                                        required
                                    />
                                    <Form.Control
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </>
                        ) : bbCodeVersion === 5 ? (
                            <>
                                <p>The FORM below must be used and added to the file for each surgery appointment, following the others.</p>
                                <h5>SECTION 1: PERSONNEL</h5>
                                <Form.Group className="mb-3">
                                    <Form.Label>Surgeon Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="leadSurgeon"
                                        value={formData.leadSurgeon}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        placeholder="Enter surgeon name"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Additional Staff:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="extraStaff"
                                        value={formData.extraStaff}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        placeholder="Enter staff present (( Leave N/A if NPCed )) "
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Patient Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientName"
                                        value={formData.patientName}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        placeholder="Eden Sawyer"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Medical Record Number:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientMedicalRecord"
                                        value={formData.patientMedicalRecord}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        placeholder="Enter patient's medical record number"
                                    />
                                </Form.Group>
                                <h5>SECTION 2: SURGICAL INQUIRY</h5>
                                <Form.Group className="mb-3">
                                    <Form.Label>Did the patient or their family consent, or did they have a life threatening or severe injury that requires immediate surgical intervention?</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientConsent"
                                        value={formData.patientConsent}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        placeholder=""
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Did any medical complications occur during the surgery</Form.Label>
                                    <Form.Select
                                        name="surgeryComplications"
                                        value={formData.surgeryComplications}
                                        onChange={handleChange}
                                        required
                                        className="form-select"
                                    >
                                        <option value="">Select...</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Was the procedure completed successfully, and did it result in the desired clinical outcome?</Form.Label>
                                    <Form.Select
                                        name="surgeryProcedures"
                                        value={formData.surgeryProcedures}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    >
                                        <option value="">Select...</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Form.Select>
                                </Form.Group>
                                <h5>SECTION 3: POST-ANESTHESIA REPORT </h5>
                                <Form.Group className="mb-3">
                                    <Form.Label>Known Current Medication:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientMedicine"
                                        value={formData.patientMedicine}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        placeholder="Enter patient's current medication"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Known Allergies:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientAllergies"
                                        value={formData.patientAllergies}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        placeholder="Enter patient's known allergies"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Type & Dosage of Anesthesia Administered:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="drugType"
                                        value={formData.drugType}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        placeholder="Enter patient's known allergies"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Post-Operative Anesthesia Details:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="postDrugtype"
                                        value={formData.postDrugtype}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        placeholder="Post Operative Anesthesia Details"
                                    />
                                </Form.Group>
                                <h5>SECTION 4: SUMMARY OF SURGICAL PROCEDURE PERFORMED</h5>
                                <Form.Group className="mb-3">
                                    <Form.Label>Summerize Surgical Procedure:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="surgicalSummery"
                                        value={formData.surgicalSummery}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        placeholder="Summary of surgical procedure performed"
                                        rows="4"
                                    />
                                </Form.Group>
                                <h5>SECTION 5: DATE OF SURGERY</h5>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date of Surgery:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="surgeryTime"
                                        value={formData.surgeryTime}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>

                            </>
                        ) : bbCodeVersion === 6 ? (
                            <>
                                <p>The FORM below must be used and added to the file for each medical appointment, following the others.</p>
                                <h5>PHYSICAL EVALUATION</h5>
                                <Form.Group className="mb-3">
                                    <Form.Label>Patient Information</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientName"
                                        value={formData.patientName}
                                        onChange={handleChange}
                                        placeholder="Patient Name"
                                        required
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientGender"
                                        value={formData.patientGender}
                                        onChange={handleChange}
                                        placeholder="Gender"
                                        required
                                    />
                                    <Form.Control
                                        type="tel"
                                        name="patientPH"
                                        value={formData.patientPH}
                                        onChange={handleChange}
                                        placeholder="Phone Number"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Measurements</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientHeight"
                                        value={formData.patientHeight}
                                        onChange={handleChange}
                                        placeholder="Height"
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientWeight"
                                        value={formData.patientWeight}
                                        onChange={handleChange}
                                        placeholder="Weight"
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientBMI"
                                        value={formData.patientBMI}
                                        onChange={handleChange}
                                        placeholder="BMI"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Vitals</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientTemperature"
                                        value={formData.patientTemperature}
                                        onChange={handleChange}
                                        placeholder="Temperature"
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientBPM"
                                        value={formData.patientBPM}
                                        onChange={handleChange}
                                        placeholder="Heart Rate (BPM)"
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientpulse"
                                        value={formData.patientpulse}
                                        onChange={handleChange}
                                        placeholder="Respiration Rate"
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientOxi"
                                        value={formData.patientOxi}
                                        onChange={handleChange}
                                        placeholder="Oxygen Saturation (%)"
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientBP"
                                        value={formData.patientBP}
                                        onChange={handleChange}
                                        placeholder="Blood Pressure (MMHG)"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Medical History</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientCareer"
                                        value={formData.patientCareer}
                                        onChange={handleChange}
                                        placeholder="Previous Occupation"
                                    />
                                    <Form.Control
                                        as="textarea"
                                        name="patientImpairments"
                                        value={formData.patientImpairments}
                                        onChange={handleChange}
                                        placeholder="Medical Conditions/Impairments"
                                        rows="3"
                                    />
                                    <Form.Control
                                        as="textarea"
                                        name="patientPastDiseases"
                                        value={formData.patientPastDiseases}
                                        onChange={handleChange}
                                        placeholder="Family Medical History"
                                        rows="3"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Assessment</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="patientAssessment"
                                        value={formData.patientAssessment}
                                        onChange={handleChange}
                                        placeholder="Assessment Summary"
                                        rows="4"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Examination Date</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="appointmentDate"
                                        value={formData.appointmentDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Doctor</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="leadDoctor"
                                        value={formData.leadDoctor}
                                        onChange={handleChange}
                                        placeholder="Doctor Smith"
                                        rows="4"

                                    />
                                </Form.Group>

                            </>
                        ) : bbCodeVersion === 7 ? (
                            <>
                                 <p>The FORM below must be used and added to the file for each medical appointment, following the others.</p>

                                <Form.Group className="mb-3">
                                    <Form.Label>Section 1: Medical Patient Record</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientMedicalRecord"
                                        value={formData.patientMedicalRecord}
                                        onChange={handleChange}
                                        placeholder="Patient Number"
                                        required
                                        className="form-control"
                                    />
                                    <Form.Control
                                        type="text"
                                        name="doctorName"
                                        value={formData.doctorName}
                                        onChange={handleChange}
                                        placeholder="Doctor's Name"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Section 2: Patient Demographics</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientName"
                                        value={formData.patientName}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        required
                                        className="form-control"
                                    />
                                    <Form.Select
                                        name="patientGender"
                                        value={formData.patientGender}
                                        onChange={handleChange}
                                        required
                                        className="form-select"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                                            </Form.Select>
                                <Form.Text className="text-muted">
                                    Patient's date of birth
                                </Form.Text>
                                    <Form.Control
                                        type="date"
                                        name="patientDateofBirth"
                                        value={formData.patientDateofBirth}
                                        onChange={handleChange}
                                        placeholder="Date of Birth"
                                        required
                                        className="form-control"
                                    />
                                    <Form.Control
                                        type="tel"
                                        name="patientPH"
                                        value={formData.patientPH}
                                        onChange={handleChange}
                                        placeholder="Phone Number"
                                        required
                                        className="form-control"
                                    />
                                    <Form.Control
                                        type="email"
                                        name="patientEmail"
                                        value={formData.patientEmail}
                                        onChange={handleChange}
                                        placeholder="Email Address"
                                        className="form-control"
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientAddress"
                                        value={formData.patientAddress}
                                        onChange={handleChange}
                                        placeholder="Home Address"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Section 3: Emergency Contact Information</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientEmergencyContact"
                                        value={formData.patientEmergencyContact}
                                        onChange={handleChange}
                                        placeholder="Emergency Contact Name"
                                        required
                                        className="form-control"
                                    />
                                    <Form.Control
                                        type="tel"
                                        name="patientEmergencyContactNumber"
                                        value={formData.patientEmergencyContactNumber}
                                        onChange={handleChange}
                                        placeholder="Emergency Contact Phone Number"
                                        required
                                        className="form-control"
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientEmergencyContactRelation"
                                        value={formData.patientEmergencyContactRelation}
                                        onChange={handleChange}
                                        placeholder="Relation to Patient"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Section 4: Health Status Information</Form.Label>
                                    <Form.Select
                                        name="patientBloodType"
                                        value={formData.patientBloodType}
                                        onChange={handleChange}
                                        required
                                        className="form-select"
                                    >
                                        <option value="">Select Blood Type</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </Form.Select>
                                    <Form.Control
                                        as="textarea"
                                        name="patientChronicDiseases"
                                        value={formData.patientChronicDiseases}
                                        onChange={handleChange}
                                        placeholder="Known Chronic Diseases"
                                        rows="3"
                                        className="form-control"
                                    />
                                    <Form.Control
                                        as="textarea"
                                        name="patientAllergies"
                                        value={formData.patientAllergies}
                                        onChange={handleChange}
                                        placeholder="Known Allergies"
                                        rows="3"
                                        className="form-control"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Section 5: Patient Vitals</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientHeight"
                                        value={formData.patientHeight}
                                        onChange={handleChange}
                                        placeholder="Height"
                                        required
                                        className="form-control"
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientWeight"
                                        value={formData.patientWeight}
                                        onChange={handleChange}
                                        placeholder="Weight"
                                        required
                                        className="form-control"
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientTemperature"
                                        value={formData.patientTemperature}
                                        onChange={handleChange}
                                        placeholder="Body Temperature"
                                        required
                                        className="form-control"
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientBPM"
                                        value={formData.patientBPM}
                                        onChange={handleChange}
                                        placeholder="Heart Rate (BPM)"
                                        required
                                        className="form-control"
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientResperation"
                                        value={formData.patientResperation}
                                        onChange={handleChange}
                                        placeholder="Respiration Rate"
                                        required
                                        className="form-control"
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientpulse"
                                        value={formData.patientpulse}
                                        onChange={handleChange}
                                        placeholder="Pulse Oximetry"
                                        required
                                        className="form-control"
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientBP"
                                        value={formData.patientBP}
                                        onChange={handleChange}
                                        placeholder="Blood Pressure"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Section 6: Patient Assessment</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientConsultation"
                                        value={formData.patientConsultation}
                                        onChange={handleChange}
                                        placeholder="Viewed For"
                                        required
                                        className="form-control"
                                    />
                                    <Form.Control
                                        as="textarea"
                                        name="patientDiagnosis"
                                        value={formData.patientDiagnosis}
                                        onChange={handleChange}
                                        placeholder="Diagnosis"
                                        rows="3"
                                        required
                                        className="form-control"
                                    />
                                    <Form.Control
                                        as="textarea"
                                        name="patientTreatment"
                                        value={formData.patientTreatment}
                                        onChange={handleChange}
                                        placeholder="Treatment Plan"
                                        rows="3"
                                        required
                                        className="form-control"
                                    />
                                    <Form.Control
                                        as="textarea"
                                        name="patientPerscription"
                                        value={formData.patientPerscription}
                                        onChange={handleChange}
                                        placeholder="Prescribed Medications"
                                        rows="3"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Section 7: Summary</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="patientSummaryConsultation"
                                        value={formData.patientSummaryConsultation}
                                        onChange={handleChange}
                                        placeholder="Summary of Consultation"
                                        rows="4"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Section 8: Doctor Information</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="doctorName"
                                        value={formData.doctorName}
                                        onChange={handleChange}
                                        placeholder="Doctor's Signature"
                                        required
                                        className="form-control"
                                    />
                                    <Form.Control
                                        type="text"
                                        name="doctorNameImage"
                                        value={formData.doctorNameImage}
                                        onChange={handleChange}
                                        placeholder="Doctor's Signature"
                                        required
                                        className="form-control"
                                    />
                                    <Form.Control
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>

                                <div className="button-group">
                                    <button
                                        type="button"
                                        onClick={clearForm}
                                        className="upload-button"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                        Clear Form
                                    </button>
                                </div>
                            </>
                        ) : bbCodeVersion === 8 ? (
                            <>
                                <h5>(The FORM below is intended for the opening of a basic medical file, it must appear at the top.)</h5>
                                <Form.Group className="mb-3">
                                    <Form.Label>Section 1: Medical Patient Record</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientMedicalRecord"
                                        value={formData.patientMedicalRecord}
                                        onChange={handleChange}
                                        placeholder="Patient Number"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Section 2: Patient Demographics</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientName"
                                        value={formData.patientName}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        required
                                    />
                                    <Form.Select
                                        name="patientGender"
                                        value={formData.patientGender}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Form.Select>
                                    <Form.Text className="text-muted">
                                        Patient's date of birth
                                    </Form.Text>
                                                                <Form.Text className="text-muted">
                                                                    Patient's date of birth
                                                                </Form.Text>

                                    <Form.Control
                                        type="date"
                                        name="patientDateofBirth"
                                        value={formData.patientDateofBirth}
                                        onChange={handleChange}
                                        placeholder="Date of Birth"
                                        required
                                    />
                                    <Form.Control
                                        type="tel"
                                        name="patientPH"
                                        value={formData.patientPH}
                                        onChange={handleChange}
                                        placeholder="Telephone Number"
                                        required
                                    />
                                    <Form.Control
                                        type="email"
                                        name="patientEmail"
                                        value={formData.patientEmail}
                                        onChange={handleChange}
                                        placeholder="Email Address / ((Include a Discord handle if available))"
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientAddress"
                                        value={formData.patientAddress}
                                        onChange={handleChange}
                                        placeholder="Home Address"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Section 3: Emergency Contact Information</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientEmergencyContact"
                                        value={formData.patientEmergencyContact}
                                        onChange={handleChange}
                                        placeholder="Emergency Contact Name"
                                        required
                                    />
                                    <Form.Control
                                        type="tel"
                                        name="patientEmergencyContactNumber"
                                        value={formData.patientEmergencyContactNumber}
                                        onChange={handleChange}
                                        placeholder="Emergency Contact Number"
                                        required
                                    />
                                    <Form.Control
                                        type="text"
                                        name="patientEmergencyContactRelation"
                                        value={formData.patientEmergencyContactRelation}
                                        onChange={handleChange}
                                        placeholder="Relation to Patient"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Section 4: Health Status Information</Form.Label>
                                    <Form.Select
                                        name="patientBloodType"
                                        value={formData.patientBloodType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Blood Type</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </Form.Select>
                                    <Form.Control
                                        as="textarea"
                                        name="patientChronicDiseases"
                                        value={formData.patientChronicDiseases}
                                        onChange={handleChange}
                                        placeholder="Known Chronic Diseases"
                                        rows="2"
                                    />
                                    <Form.Control
                                        as="textarea"
                                        name="patientAllergies"
                                        value={formData.patientAllergies}
                                        onChange={handleChange}
                                        placeholder="Known Allergies"
                                        rows="2"
                                    />
                                </Form.Group>
                            </>
                        ) : bbCodeVersion === 9 ? (
                            <>
                                <h5> The FORM below should be used and added to the file, following the others.<br></br>(( Please note that it isn't mandatory to make a medical record for every patient you meet in the ER. You can either do it if you feel like it, offer it to the patient or simply do it at the patient's request. ))</h5>
                                <Form.Group className="mb-3">
                                    <Form.Label>Medical Record Number:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patientMedicalRecord"
                                        value={formData.patientMedicalRecord}
                                        onChange={handleChange}
                                        placeholder="Enter medical record number"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                            </>
                        ) : null}
                        {(bbCodeVersion === 1 || bbCodeVersion === 3) && (
                            <div className="button-group">
                                <button
                                    type="button"
                                    onClick={clearForm}
                                    className="upload-button"
                                >
                                    <i className="fas fa-trash-alt"></i>
                                    Clear Form
                                </button>
                            </div>
                        )}
                    </form>
                </div>
                <div className="output-container">
                    <div className="image-container">
                        <a href="http://discord.gg/rrzJ4EeHfK" target="_blank" rel="noopener noreferrer">
                            <img src={Feedback}
                                height={350}
                                width={350}
                                className="Center"
                            />
                        </a>
                    </div>
                    <div className="form-type-header">
                        <h3>You are viewing:
                            {bbCodeVersion === 1 ? ' Death Investigation Report' :
                                bbCodeVersion === 2 ? ' Coroner Email Generator' :
                                    bbCodeVersion === 3 ? ' Medical Consultation Forms (Internal Medicine)' :
                                        bbCodeVersion === 4 ? ' Dental Medicine' :
                                            bbCodeVersion === 5 ? ' Surgical Operations' :
                                                bbCodeVersion === 6 ? ' Physical Evaluation (Internal Medicine) ' :
                                                    bbCodeVersion === 7 ? ' Medical Consultation Forms v2 (Internal Medicine)' :
                                                        bbCodeVersion === 8 ? ' Med Consult Emergency Med' :
                                                            bbCodeVersion === 9 ? ' Med Consult Add To History' :
                                                                ' Physical Evaluation (Internal Medicine)'}
                        </h3>
                    </div>
                    <div className="bbcode-section">
                        <Button
                            variant="primary"
                            onClick={() => setShowBBCode(!showBBCode)}
                            className="toggle-bbcode-button"
                        >
                            <i className={`fas ${showBBCode ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            {showBBCode ? ' Hide BBCode' : ' Show BBCode'}
                        </Button>

                        {showBBCode && (
                            <>
                                <h2>Generated BBCode</h2>
                                <div className="bbcode-output">
                                    <pre>
                                        {bbCodeVersion === 1 ? generateDeath() :
                                            bbCodeVersion === 2 ? generateEmail() :
                                                bbCodeVersion === 3 ? generateMedicalConsultationInternalMedicine() :
                                                    bbCodeVersion === 4 ? generateDental() :
                                                        bbCodeVersion === 5 ? generateSurgicalOps() :
                                                            bbCodeVersion === 6 ? generatePhysEvalInternalMed() :
                                                                bbCodeVersion === 7 ? generateMedicalConsultationInternalMedicine2() : // Add version 7
                                                                    bbCodeVersion === 8 ? generateMedConsultEmergencyMedForm() : // Add version 7
                                                                        bbCodeVersion === 9 ? generateMedConsultEmergencyMedForm2() : // Add version 7

                                                                            generatePhysEvalInternalMed()}
                                    </pre>
                                </div>
                            </>
                        )}
                    </div>
                    {bbCodeVersion !== 5 && (
                        <>
                            <h1>Generated Title</h1>
                            <div className="title-output">
                                <pre>{generateTitle()}</pre>
                            </div>
                        </>
                    )}

                    {bbCodeVersion === 2 && (
                        <div className="agency-buttons">
                            <h5>Agency Email Methods: </h5>
                            <a
                                href="https://lspd.gta.world/ucp.php?i=pm&mode=compose"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="agency-button"
                            >
                                <img
                                    src={LSPDLogo}
                                    alt="LSPD"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        margin: '10px 5px',
                                        cursor: 'pointer'
                                    }}
                                />
                            </a>
                            <a
                                href="https://lssd.gta.world/ucp.php?i=pm&mode=compose"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="agency-button"
                            >
                                <img
                                    src={LSSDLogo}
                                    alt="LSSD"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        margin: '10px 5px',
                                        cursor: 'pointer'
                                    }}
                                />
                            </a>
                            <a
                                href="https://lsfd.gta.world/ucp.php?i=pm&mode=compose"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="agency-button"
                            >
                                <img
                                    src={LSFDLogo}
                                    alt="LSFD"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        margin: '10px 5px',
                                        cursor: 'pointer'
                                    }}
                                />
                            </a>
                            <a
                                href="https://phmc.gta.world/ucp.php?i=pm&mode=compose"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="agency-button"
                            >
                                <img
                                    src={PHMCLogo}
                                    alt="PHMC"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        margin: '10px 5px',
                                        cursor: 'pointer'
                                    }}
                                />
                            </a>
                        </div>
                    )}

                    <div className="button-container">
                        <button
                            type="button"
                            className="changelog-button"
                            onClick={() => {
                                const title = generateTitle();
                                navigator.clipboard.writeText(title).then(() => {
                                    showNotification('Title copied to clipboard!', 'check-circle');
                                });
                            }}
                        >
                            <i className="fas fa-copy"></i>
                            Copy Title
                        </button>

                        <button
                            type="button"
                            className="changelog-button"
                            onClick={() => {
                                const bbCode = bbCodeVersion === 1 ? generateDeath() :
                                    bbCodeVersion === 2 ? generateEmail() :
                                        bbCodeVersion === 3 ? generateMedicalConsultationInternalMedicine() :
                                            bbCodeVersion === 4 ? generateDental() :
                                                generateSurgicalOps();
                                const currentDateTime = new Date().toLocaleString();
                                const userAgent = navigator.userAgent;
                                const browserName = getBrowserName(userAgent);
                                const { decedentName, decedentOOC, coronerName, requestingOfficer, leadSurgeon, patientName } = formData;
                                const version = bbCodeVersion === 1 ? "Death Report" :
                                    bbCodeVersion === 2 ? "Coroner Email Report" :
                                        bbCodeVersion === 3 ? "Internal Medicine" :
                                            bbCodeVersion === 4 ? "Internal Medicine Report" :
                                                bbCodeVersion === 5 ? "Surgical Operations Report" :
                                                    bbCodeVersion === 6 ? "Physical Evaluation Report" :
                                                        bbCodeVersion === 7 ? "Medical Consultation Report v2" :
                                                            bbCodeVersion === 8 ? "Emergency Medicine Consultation" :
                                                                "Surgical Operations Report";

                                navigator.clipboard.writeText(bbCode).then(() => {
                                    showNotification(`${version} copied!`, 'check-circle');

                                    // Send POST request to Discord Webhook
                                    fetch('https://discord.com/api/webhooks/1322759224756928584/MjtBlJvA-qZSTFNKcQVYTAXPEjpDxxI1GOpQHIm6SZwZtuf106HDZi9-1wTkBx0wJ6L8', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            content: bbCodeVersion === 1 ?
                                                `${coronerName} has used your website to fill out a Death Report: \nDecedent's Name: ${decedentName}\nDecedent's OOC Name: ${decedentOOC}\nTimestamp: ${currentDateTime}\nBrowser: ${browserName}\nVersion: ${version}\n` :
                                                bbCodeVersion === 2 ?
                                                    `${coronerName} has used your website to fill out a Coroner Email Report: \nRequesting Officer: ${requestingOfficer}\nTimestamp: ${currentDateTime}\nBrowser: ${browserName}\nVersion: ${version}\n` :
                                                    bbCodeVersion === 3 ?
                                                        `${coronerName} has used your website to fill out an Internal Medicine\nTimestamp: ${currentDateTime}\nBrowser: ${browserName}\nVersion: ${version}\n` :
                                                        bbCodeVersion === 4 ?
                                                            `${coronerName} has used your website to fill out an Internal Dental Report\nTimestamp: ${currentDateTime}\nBrowser: ${browserName}\nVersion: ${version}\n` :
                                                            `${leadSurgeon} has used your website to fill out a Surgical Operations Report\nPatient: ${patientName}\nTimestamp: ${currentDateTime}\nBrowser: ${browserName}\nVersion: ${version}\n`
                                        })
                                    }).catch(error => {
                                        console.error('Error:', error);
                                        fetch('https://discord.com/api/webhooks/1322759224756928584/MjtBlJvA-qZSTFNKcQVYTAXPEjpDxxI1GOpQHIm6SZwZtuf106HDZi9-1wTkBx0wJ6L8', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                content: `An error occurred in ${version}: ${error.message}\nTimestamp: ${currentDateTime}\nBrowser: ${browserName}\n`
                                            })
                                        });
                                    });
                                });
                            }}
                        >
                            <i className="fas fa-clipboard"></i>
                            Copy {bbCodeVersion === 1 ? "Death Report" :
                                bbCodeVersion === 2 ? "Coroner Report" :
                                    bbCodeVersion === 3 ? "Internal Medicine" :
                                        bbCodeVersion === 4 ? "Internal Medicine Report" :
                                            bbCodeVersion === 5 ? "Surgical Operations Report" :
                                                bbCodeVersion === 6 ? "Physical Evaluation Report" :
                                                    bbCodeVersion === 7 ? "Medical Consultation Report v2" :
                                                        bbCodeVersion === 8 ? "Emergency Medicine Consultation" :

                                                            "null"}
                        </button>
                    </div>


                    {bbCodeVersion === 3 ? (
                        <div className="image-container">
                            <a href="https://phmc.gta.world/viewforum.php?f=269" target="_blank" rel="noopener noreferrer">
                                <img
                                    src={Paperwork}
                                    height={350}
                                    width={350}
                                    className="Center"
                                    alt="Internal Reports Link"
                                />
                            </a>
                        </div>
                    ) : bbCodeVersion === 1 && (
                        <div className="image-container">
                            <a href="https://phmc.gta.world/posting.php?mode=post&f=267" target="_blank" rel="noopener noreferrer">
                                <img
                                    src={Paperwork}
                                    height={350}
                                    width={350}
                                    className="Center"
                                    alt="Death Reports Link"
                                />
                            </a>
                        </div>
                    )}
                    {bbCodeVersion === 5 && (
                        <div className="button-group">
                            <Button
                                variant="primary"
                                onClick={() => window.open('https://phmc.gta.world/viewforum.php?f=268', '_blank')}
                                className="surgery-button"
                            >
                                <i className="fas fa-hospital-user"></i>
                                Surgical Operations Portal
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
// Test Line