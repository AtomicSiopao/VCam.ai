# Additional Test Cases

## VCam.ai Dashboard

### DASHBOARD NAVIGATION
- **Negative:** Should gracefully handle navigation to an invalid or non-existent page.
- **Edge:** Should maintain session and state when navigating back and forth between pages.

### BACKGROUNDS
- **Negative:** Should display an error message when uploading a file with an unsupported format (e.g., .txt, .pdf).
- **Negative:** Should prevent uploading a background image that exceeds the maximum file size limit.
- **Edge:** Should test uploading an image with the exact maximum allowed resolution.
- **Edge:** Should test uploading a video with a very short duration (e.g., 1 second).

### LOGOS
- **Negative:** Should display an error when a non-image or non-video file is uploaded as a logo.
- **Negative:** Should handle gracefully the upload of a logo file that is corrupted or incomplete.
- **Edge:** Should test uploading a logo with unconventional dimensions (e.g., very wide or very tall).

### NAME TAGS
- **Negative:** Should prevent saving a name tag with empty or invalid inputs (e.g., special characters in the name).
- **Edge:** Should test setting a very long name and title to see how the UI handles overflow.

### SETTINGS
- **Negative:** Should show an error if a new workspace name is empty or contains invalid characters.
- **Edge:** Should confirm that renaming a workspace does not affect user permissions or existing settings.

## VCam.ai Home Page

- **Negative:** Should verify that broken or dead links are handled gracefully, perhaps leading to a 404 page.
- **Edge:** Should test the responsiveness of the home page on various screen sizes (e.g., mobile, tablet, desktop).

## VCam.ai Onboarding

- **Negative:** Should ensure that skipping the onboarding process leads the user to a default, functional state of the application.
- **Edge:** Should test completing the onboarding process with the minimum required information.

## General
- **Security:** Should check for common vulnerabilities like cross-site scripting (XSS) in all user input fields.
- **Performance:** Should measure the load time of the dashboard and home page to ensure they meet performance standards.
