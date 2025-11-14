# Additional Test Cases

## VCam.ai Dashboard

### DASHBOARD NAVIGATION
- **Negative: Should gracefully handle navigation to an invalid or non-existent page**
  1. Go to the Dashboard page.
  2. Log in.
  3. Manually navigate to a URL that does not exist (e.g., `https://dashboard.vcam.ai/app/invalid-page`).
  4. Verify that a "404 Not Found" page or a redirect to the dashboard is displayed.

- **Edge: Should maintain session and state when navigating back and forth between pages**
  1. Go to the Dashboard page.
  2. Log in.
  3. Navigate to the "Backgrounds" section.
  4. Upload a new background.
  5. Navigate to the "Logos" section.
  6. Navigate back to the "Backgrounds" section using the browser's back button.
  7. Verify that the newly uploaded background is still present.

### BACKGROUNDS
- **Negative: Should display an error message when uploading a file with an unsupported format**
  1. Go to the Dashboard page.
  2. Log in.
  3. Navigate to the "Backgrounds" section.
  4. Click the "Add background" button.
  5. Attempt to upload a file with an unsupported format (e.g., `.txt`, `.pdf`).
  6. Verify that an error message is displayed indicating the file format is not supported.

- **Negative: Should prevent uploading a background image that exceeds the maximum file size limit**
  1. Go to the Dashboard page.
  2. Log in.
  3. Navigate to the "Backgrounds" section.
  4. Attempt to upload an image file that is larger than the maximum allowed size.
  5. Verify that an error message is displayed indicating the file is too large.

- **Edge: Should test uploading an image with the exact maximum allowed resolution**
  1. Go to the Dashboard page.
  2. Log in.
  3. Navigate to the "Backgrounds" section.
  4. Upload an image with the exact maximum allowed resolution.
  5. Verify that the image is uploaded successfully without any errors or cropping.

- **Edge: Should test uploading a video with a very short duration**
  1. Go to the Dashboard page.
  2. Log in.
  3. Navigate to the "Backgrounds" section.
  4. Upload a video file with a duration of 1 second.
  5. Verify that the video is uploaded and plays correctly.

### LOGOS
- **Negative: Should display an error when a non-image or non-video file is uploaded as a logo**
  1. Go to the Dashboard page.
  2. Log in.
  3. Navigate to the "Logos" section.
  4. Click the "Add logo" button.
  5. Attempt to upload a file that is not an image or video (e.g., `.docx`).
  6. Verify that an appropriate error message is shown.

- **Negative: Should handle gracefully the upload of a logo file that is corrupted or incomplete**
  1. Go to the Dashboard page.
  2. Log in.
  3. Navigate to the "Logos" section.
  4. Attempt to upload a corrupted or incomplete image file.
  5. Verify that the application does not crash and displays a user-friendly error message.

- **Edge: Should test uploading a logo with unconventional dimensions**
  1. Go to the Dashboard page.
  2. Log in.
  3. Navigate to the "Logos" section.
  4. Upload a very wide image (e.g., 1000x100 pixels).
  5. Verify that the logo is displayed correctly in the UI without distortion.
  6. Upload a very tall image (e.g., 100x1000 pixels).
  7. Verify that the logo is displayed correctly.

### NAME TAGS
- **Negative: Should prevent saving a name tag with empty or invalid inputs**
  1. Go to the Dashboard page.
  2. Log in.
  3. Navigate to the "Name Tags" section.
  4. Clear the name and title fields.
  5. Attempt to save the name tag.
  6. Verify that a validation message appears for the required fields.
  7. Enter a name with special characters (e.g., `!@#$%^&*()`).
  8. Verify that the input is sanitized or an error is displayed.

- **Edge: Should test setting a very long name and title to see how the UI handles overflow**
  1. Go to the Dashboard page.
  2. Log in.
  3. Navigate to the "Name Tags" section.
  4. Enter a name and title that are longer than the expected display area.
  5. Verify that the text is truncated with an ellipsis or wraps to the next line without breaking the layout.

### SETTINGS
- **Negative: Should show an error if a new workspace name is empty or contains invalid characters**
  1. Go to the Dashboard page.
  2. Log in.
  3. Navigate to the "Settings" section.
  4. Clear the workspace name field.
  5. Click "Save".
  6. Verify that an error message is displayed.
  7. Enter a workspace name with invalid characters (e.g., `<script>alert('XSS')</script>`).
  8. Verify that the input is properly sanitized and does not execute any script.

- **Edge: Should confirm that renaming a workspace does not affect user permissions or existing settings**
  1. Go to the Dashboard page.
  2. Log in.
  3. Navigate to the "Settings" section.
  4. Note the current user permissions and settings.
  5. Rename the workspace.
  6. Verify that all previous settings and user permissions remain unchanged.

## VCam.ai Home Page

- **Negative: Should verify that broken or dead links are handled gracefully**
  1. Go to the Home page.
  2. Manually check each link on the page to ensure it leads to a valid page.
  3. If a link is broken, verify that a 404 page is shown.

- **Edge: Should test the responsiveness of the home page on various screen sizes**
  1. Go to the Home page.
  2. Open the browser's developer tools.
  3. Emulate different device screen sizes (e.g., mobile, tablet, desktop).
  4. Verify that the layout and content are displayed correctly on each screen size.

## VCam.ai Onboarding

- **Negative: Should ensure that skipping the onboarding process leads the user to a default, functional state**
  1. Go to the Dashboard page.
  2. Create a new account.
  3. If possible, skip the onboarding process.
  4. Verify that the user is redirected to the dashboard and that the application is in a usable state.

- **Edge: Should test completing the onboarding process with the minimum required information**
  1. Go to the Dashboard page.
  2. Log in.
  3. Complete the onboarding process by only filling out the mandatory fields.
  4. Verify that the onboarding completes successfully and the application functions as expected.

## General
- **Security: Should check for common vulnerabilities like cross-site scripting (XSS) in all user input fields**
  1. Identify all input fields in the application (e.g., name tag, workspace name).
  2. Enter a script payload (e.g., `<script>alert('XSS')</script>`) into each field.
  3. Save the input.
  4. Verify that the script is not executed and the input is sanitized.

- **Performance: Should measure the load time of the dashboard and home page**
  1. Use browser developer tools to measure the page load time for the dashboard and home page.
  2. Verify that the load times are within acceptable limits.
  3. Check for any performance bottlenecks, such as large images or slow API requests.
