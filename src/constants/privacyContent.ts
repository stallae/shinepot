export interface PrivacySubsection {
    boldText?: string;
    text: string;
}

export interface PrivacySection {
    id: number;
    title: string;
    description?: string;
    subsections?: PrivacySubsection[];
}

export interface PrivacyPageContent {
    title: string;
    sections: PrivacySection[];
}

export const PRIVACY_CONTENT: Record<string, PrivacyPageContent> = {
    dataCollection: {
        title: "Data Collection",
        sections: [
            {
                id: 1,
                title: "1. Personal Data Provided by the User",
                description: "We collect various types of data to enhance your experience and improve our services. This includes:",
                subsections: [
                    {
                        boldText: "Name",
                        text: "(for personalization)"
                    },
                    {
                        boldText: "Email Address",
                        text: "(for account management and notifications)"
                    },
                    {
                        boldText: "Profile Picture",
                        text: "(optional, if uploaded by the user)"
                    },
                    {
                        boldText: "Messages",
                        text: "(end-to-end encrypted, not accessible by us)"
                    }
                ]
            },
            {
                id: 2,
                title: "2. Automatically Collected Data",
                description: "We also collect certain data automatically to improve functionality and security, including:",
                subsections: [
                    {
                        boldText: "Device Information",
                        text: "(if permitted, to provide location-based features)"
                    },
                    {
                        boldText: "Location Data",
                        text: "(if permitted, to provide location-based features) system, and app version for troubleshooting"
                    },
                    {
                        boldText: "Usage Data",
                        text: "(interactions with the app, such as feature usage and frequency)"
                    }
                ]
            },
            {
                id: 3,
                title: "3. How We Collect Data",
                subsections: [
                    {
                        text: "Provided by You: When signing up, messaging, or updating your profile."
                    },
                    {
                        text: "Automatically Collected: Through app analytics, cookie technologies, and server logs."
                    }
                ]
            }
        ]
    },
    dataUsage: {
        title: "Data Usage",
        sections: [
            {
                id: 1,
                title: "1. Purposes of Processing",
                description: "Your data is used solely to provide and improve the ShinePot experience:",
                subsections: [
                    {
                        boldText: "Service Delivery:",
                        text: "To ensure your messages are delivered to the right recipients at the scheduled time."
                    },
                    {
                        boldText: "Account Management:",
                        text: "To manage your profile, subscriptions, and security settings."
                    },
                    {
                        boldText: "Communication:",
                        text: "To send you important service updates, security alerts, and support responses."
                    }
                ]
            },
            {
                id: 2,
                title: "2. Legal Basis",
                description: "We process your data based on your consent and the necessity of fulfilling our contract with you.",
            }
        ]
    },
    dataSharing: {
        title: "Data Sharing",
        sections: [
            {
                id: 1,
                title: "1. Third-Party Service Providers",
                description: "We do not sell your data. We only share necessary information with trusted partners to operate our service:",
                subsections: [
                    {
                        boldText: "Cloud Storage:",
                        text: "To securely store your encrypted messages."
                    },
                    {
                        boldText: "Email Services:",
                        text: "To send notifications and verification codes."
                    }
                ]
            },
            {
                id: 2,
                title: "2. Legal Requirements",
                description: "We may disclose information if required by law or in response to valid requests by public authorities.",
            }
        ]
    },
    userRights: {
        title: "User Rights",
        sections: [
            {
                id: 1,
                title: "1. Access and Portability",
                description: "You have the right to request a copy of the personal data we hold about you at any time."
            },
            {
                id: 2,
                title: "2. Rectification and Erasure",
                description: "You can update your personal information in your profile settings or request the deletion of your account and all associated data."
            },
            {
                id: 3,
                title: "3. Withdrawal of Consent",
                description: "You may withdraw your consent for data processing at any time, which may affect your ability to use certain features."
            }
        ]
    },
    securityMeasures: {
        title: "Security Measures",
        sections: [
            {
                id: 1,
                title: "1. End-to-End Encryption",
                description: "All messages sent through ShinePot are protected by state-of-the-art end-to-end encryption. Only you and the recipient can read them."
            },
            {
                id: 2,
                title: "2. Data Protection",
                description: "We use secure servers, firewalls, and regular security audits to protect your data from unauthorized access."
            },
            {
                id: 3,
                title: "3. Responsible Disclosure",
                description: "We encourage users to report any security vulnerabilities they find, and we commit to fixing them promptly."
            }
        ]
    }
};
