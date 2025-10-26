Feature: VCam Dashboard Management
  The purpose of this feature is to validate the core dashboard functionalities of VCam.ai
  including login, team management, workspace settings, logos, backgrounds, and billing.

  Background:
    Given the user is on the VCam Dashboard login page

  @login
  Scenario: Successful login
    Given the user has a valid email and password
    When the user logs in
    Then the user should be redirected to the dashboard home page

  @login
  Scenario: Login failure with invalid credentials
    Given the user enters an invalid password
    When the user attempts to log in
    Then an error message "Invalid email or password" should appear

  @dashboard
  Scenario: Display dashboard overview
    Given the user is logged in
    When the dashboard loads
    Then the dashboard should display user name, workspace, and subscription summary

  @team
  Scenario: Admin invites a new member
    Given the user is an admin
    When the user sends an invitation to a valid email
    Then the invited member should appear as "Pending" in the team list

  @team
  Scenario: Invited member accepts the invitation
    Given the invited member receives an invitation email
    When they accept the invitation link
    Then they should gain access to the workspace dashboard

  @team
  Scenario: Non-admin cannot invite members
    Given the user is a member without admin rights
    When they attempt to invite another user
    Then an "Access denied" message should appear

  @team
  Scenario: Admin removes a member
    Given the admin is viewing the team list
    When the admin clicks "Remove" for a specific member
    Then the member should no longer appear in the list

  @team
  Scenario: Admin changes a member's role
    Given a team member exists
    When the admin changes the member's role from "Member" to "Admin"
    Then the member should have admin privileges

  @workspace
  Scenario: Update workspace name
    Given the user is on the workspace settings page
    When they change the workspace name and save
    Then the new name should appear across the dashboard

  @workspace
  Scenario: Toggle workspace discoverability
    Given the workspace is private
    When the admin toggles discoverability to public
    Then the workspace should be visible in the public list

  @background
  Scenario: Upload valid background image
    Given the user has permission to upload
    When they upload a valid JPG or PNG file
    Then the image should appear in the background list

  @background
  Scenario: Upload invalid background image
    Given the user selects an unsupported file type
    When they upload it
    Then an error message "Invalid file type" should appear

  @logo
  Scenario: Set default team logo
    Given multiple logos are uploaded
    When the admin sets one as default
    Then the selected logo should appear in meetings and dashboard

  @logo
  Scenario: Remove a team logo
    Given at least one logo exists
    When the admin removes it
    Then it should disappear from the logo list

  @billing
  Scenario: View subscription details
    Given the user is on the billing page
    When the billing information is loaded
    Then the current plan, next billing date, and payment method should display

  @billing
  Scenario: Upgrade subscription plan
    Given the user has an active free plan
    When they upgrade to a paid plan
    Then the dashboard should display new plan details

  @billing
  Scenario: Cancel subscription
    Given the user has an active paid plan
    When they click "Cancel subscription"
    Then access to premium features should end after the current billing cycle

  @permissions
  Scenario: Non-admin access restriction
    Given a member is logged in
    When they attempt to access billing or workspace settings
    Then an "Access denied" message should display

  @audit
  Scenario: Record user actions in activity log
    Given the admin performs user management actions
    When the admin invites or removes a member
    Then each action should be logged with timestamp and username

  @session
  Scenario: Session expiration
    Given the user is idle for 30 minutes
    When they click any dashboard link
    Then they should be redirected to the login page

  @security
  Scenario: Unauthorized API call
    Given an invalid token is used in an API request
    When the system processes it
    Then a 401 "Unauthorized" response should be returned

  @export
  Scenario: Export team list
    Given the user is on the team management page
    When they click "Export CSV"
    Then a file containing team details should be downloaded

  @responsive
  Scenario: Dashboard on mobile
    Given the user is on a mobile device
    When they access the dashboard
    Then the layout should adjust for mobile view
