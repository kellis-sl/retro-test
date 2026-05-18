# Retro Tool Test Plan

## Application Overview

Retro Tool (retrotool.app) is a free, anonymous, real-time retrospective tool for agile teams. It requires no login and operates through shareable URLs. The app guides teams through a 4-phase workflow: Brainstorm → Group & Vote → Add Action Items → Done. Key features include: adding/deleting topic cards across multiple columns, password protection, drag-and-drop grouping, voting on topics, adding action items, exporting results, creating linked retros, custom-named retro URLs, and a real-time collaborative experience.

## Test Scenarios

### 1. Landing Page

**Seed:** `seed.spec.ts`

#### 1.1. Landing page loads with correct content

**File:** `specs/landing-page/landing-page-content.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/
    - expect: Page title is 'Retro tool | Simple and effective retrospectives for your team'
    - expect: Heading 'Retro tool, simple and effective retrospectives for your team' is visible
  2. Verify the hero section is visible
    - expect: 'Start a new retro' link is present
    - expect: 'See how it works' link is present
    - expect: Retro count (e.g. '52,283 retros and counting') is visible
  3. Scroll down to the features section
    - expect: Feature cards for 'Easy peasy', 'Anonymous', 'Real time', and 'No login & private' are all visible with descriptions
  4. Scroll to the 'How to use Retro tool' section
    - expect: Section heading 'How to use Retro tool' is visible
    - expect: Sub-headings 'Brainstorm', 'Group & vote', 'Add action items', and 'Done' are all present
  5. Check the footer
    - expect: Footer contains creator credits with links to their social profiles

#### 1.2. Navigation links on landing page work correctly

**File:** `specs/landing-page/landing-page-navigation.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/
    - expect: Landing page is loaded
  2. Click the 'Start a new retro' button
    - expect: User is redirected to a new retro URL matching the UUID pattern (e.g. /xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
    - expect: The retro board is displayed in the Brainstorm phase
  3. Navigate back to https://www.retrotool.app/
    - expect: Landing page is loaded
  4. Click the 'See how it works' link
    - expect: Page scrolls to the 'How to use Retro tool' section on the same page (anchor navigation)
  5. Verify the 'Contact us' link in the header
    - expect: The link points to mailto:hi@retrotool.app
  6. Verify the 'Github' link in the header
    - expect: The link points to https://github.com/retro-tool/ and would open in a new tab

### 2. Retro Creation

**Seed:** `seed.spec.ts`

#### 2.1. Creating a new retro via /new URL

**File:** `specs/retro-creation/create-via-new-url.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new
    - expect: User is redirected to a new retro with a UUID-based URL (e.g. /xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
    - expect: The retro board is displayed in the Brainstorm phase
    - expect: All four column input fields are visible: 'It worked well that...', 'We could improve...', 'I want to ask about...', 'We need to do...' (disabled)
  2. Verify the phase breadcrumb indicator
    - expect: Breadcrumb shows: Brainstorm → Group & vote → Add action items → Done
    - expect: Current phase 'Brainstorm' is visually highlighted or indicated
  3. Verify the 'Group & vote comments' button state
    - expect: The 'Group & vote comments' button is disabled (no comments have been added yet)

#### 2.2. Creating a retro with a custom URL

**File:** `specs/retro-creation/create-with-custom-url.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/my-team-sprint-1
    - expect: A retro board is loaded at the URL https://www.retrotool.app/my-team-sprint-1
    - expect: The retro is in the Brainstorm phase
  2. Verify the retro is in a blank state (no comments)
    - expect: All four input fields are empty
    - expect: No comment cards are shown in any column
  3. Navigate back to the same custom URL in a new page load
    - expect: The same retro at https://www.retrotool.app/my-team-sprint-1 is loaded (persistent URL)

### 3. Brainstorm Phase

**Seed:** `seed.spec.ts`

#### 3.1. Adding comments in all three brainstorm columns

**File:** `specs/brainstorm/add-comments.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new to create a fresh retro
    - expect: Retro board is displayed in the Brainstorm phase
  2. Click the 'It worked well that...' input field, type 'Team collaboration was excellent', and press Enter
    - expect: A comment card with the text 'Team collaboration was excellent' appears below the input in the first column
    - expect: The input field is cleared and ready for another entry
  3. Click the 'We could improve...' input field, type 'Sprint planning process', and press Enter
    - expect: A comment card 'Sprint planning process' appears in the second column
  4. Click the 'I want to ask about...' input field, type 'Upcoming roadmap priorities', and press Enter
    - expect: A comment card 'Upcoming roadmap priorities' appears in the third column
  5. Verify the 'We need to do...' column input
    - expect: The 'We need to do...' input is disabled and cannot be typed into during the Brainstorm phase
  6. Verify the 'Group & vote comments' button is now enabled
    - expect: The 'Group & vote comments' button in the header is enabled now that comments have been added

#### 3.2. Adding multiple comments to the same column

**File:** `specs/brainstorm/add-multiple-comments.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new to create a fresh retro
    - expect: Retro board is displayed in the Brainstorm phase
  2. Add three comments to the 'It worked well that...' column: 'Good team communication', 'Delivered features on time', 'Great code reviews'
    - expect: All three comment cards appear in the first column in the order they were added
  3. Verify each comment card shows a vote counter
    - expect: Each comment card displays a vote count of '0'
    - expect: The vote buttons are disabled (voting is not available in the Brainstorm phase)

#### 3.3. Deleting a comment in the Brainstorm phase

**File:** `specs/brainstorm/delete-comment.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new to create a fresh retro
    - expect: Retro board is displayed in the Brainstorm phase
  2. Add a comment 'Test comment to delete' to the 'It worked well that...' column
    - expect: The comment card 'Test comment to delete' appears in the first column
  3. Hover over the comment card 'Test comment to delete'
    - expect: A delete button (icon button) appears on the comment card
  4. Click the delete button on the comment card
    - expect: The comment card 'Test comment to delete' is removed from the column
    - expect: The column is now empty

#### 3.4. Attempting to advance phase with no comments (button disabled)

**File:** `specs/brainstorm/advance-disabled-without-comments.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new to create a fresh retro
    - expect: Retro board is displayed in the Brainstorm phase with no comments
  2. Verify the 'Group & vote comments' button state
    - expect: The 'Group & vote comments' button is disabled
    - expect: Clicking or attempting to interact with the disabled button has no effect

#### 3.5. Submitting an empty comment is not allowed

**File:** `specs/brainstorm/submit-empty-comment.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new to create a fresh retro
    - expect: Retro board is displayed in the Brainstorm phase
  2. Click the 'It worked well that...' input field without typing anything and press Enter
    - expect: No comment card is created
    - expect: The input field remains empty
  3. Type only whitespace (spaces) in the 'We could improve...' input and press Enter
    - expect: No comment card is created for whitespace-only input

### 4. Group & Vote Phase

**Seed:** `seed.spec.ts`

#### 4.1. Advancing from Brainstorm to Group & Vote phase

**File:** `specs/group-vote/advance-to-group-vote.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new and add at least one comment to any column
    - expect: At least one comment card is visible
    - expect: The 'Group & vote comments' button is enabled
  2. Click the 'Group & vote comments' button
    - expect: A confirmation dialog appears with message 'Are you sure?' and text 'Everyone will see all comments and this can't be undone'
    - expect: Two buttons are present: 'Cancel' and 'Group & vote comments'
  3. Click 'Cancel' in the confirmation dialog
    - expect: The dialog is dismissed
    - expect: The retro remains in the Brainstorm phase
  4. Click 'Group & vote comments' again, then confirm with the 'Group & vote comments' button in the dialog
    - expect: The retro advances to the Group & Vote phase
    - expect: The instruction text changes to 'Drag and drop comments to group them together and vote for the ones you'd like to discuss about'
    - expect: The next action button in the header now reads 'Discuss and add action items'

#### 4.2. Voting on comments in the Group & Vote phase

**File:** `specs/group-vote/vote-on-comments.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new, add a comment 'Improve deployment process', then advance to the Group & Vote phase
    - expect: The retro is in the Group & Vote phase
    - expect: Comment 'Improve deployment process' is visible with a vote button showing count '0'
  2. Click the vote button on the 'Improve deployment process' comment card
    - expect: The vote count increments to '1'
    - expect: The vote button shows an active/selected state
  3. Click the vote button again on the same comment
    - expect: The vote count decrements back to '0' (toggle behavior), OR the vote button is disabled after first click (verify actual behavior)

#### 4.3. Grouping comments via drag and drop

**File:** `specs/group-vote/drag-drop-grouping.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new, add two comments to the 'We could improve...' column: 'Deployment speed' and 'CI/CD pipeline', then advance to the Group & Vote phase
    - expect: Both comments are visible in the Group & Vote phase
  2. Drag the comment card 'CI/CD pipeline' and drop it onto the 'Deployment speed' comment card
    - expect: The two comments are grouped together into a single group card
    - expect: The group shows both comments combined
    - expect: The vote count applies to the whole group

#### 4.4. Adding more comments during Group & Vote phase

**File:** `specs/group-vote/add-comments-during-vote.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new, add one comment, then advance to the Group & Vote phase
    - expect: The retro is in the Group & Vote phase
  2. Click the 'It worked well that...' input field, type 'Late addition topic', and press Enter
    - expect: The new comment card 'Late addition topic' is added to the first column
    - expect: The new card has a vote button and a counter showing '0'

### 5. Add Action Items Phase

**Seed:** `seed.spec.ts`

#### 5.1. Advancing from Group & Vote to Add Action Items phase

**File:** `specs/action-items/advance-to-action-items.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new, add a comment, advance through Brainstorm to reach the Group & Vote phase
    - expect: The retro is in the Group & Vote phase with the 'Discuss and add action items' button in the header
  2. Click the 'Discuss and add action items' button
    - expect: The retro advances to the Add Action Items phase
    - expect: The instruction text changes to 'Add action items, you can no longer group or vote comments'
    - expect: The 'We need to do...' column input is now enabled
    - expect: Vote buttons on existing comment cards are disabled
    - expect: The header button now reads 'Finish retro'

#### 5.2. Adding action items in the Add Action Items phase

**File:** `specs/action-items/add-action-items.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new, add a comment, advance to the Add Action Items phase
    - expect: The retro is in the Add Action Items phase with 'We need to do...' input enabled
  2. Click the 'We need to do...' input field, type 'Schedule weekly retrospectives', and press Enter
    - expect: An action item 'Schedule weekly retrospectives' appears below the input in the fourth column
  3. Add a second action item: 'Document deployment runbook'
    - expect: Both action items are visible in the 'We need to do...' column

### 6. Done Phase

**Seed:** `seed.spec.ts`

#### 6.1. Finishing the retro and reaching the Done phase

**File:** `specs/done/finish-retro.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new, add a comment, advance through all phases to the Add Action Items phase, add an action item, then click 'Finish retro'
    - expect: The retro advances to the Done phase
    - expect: The phase breadcrumb shows 'Done' as the current step
    - expect: The header buttons change to 'Start new retro' and 'Export'
  2. Verify the action item shows a checkbox
    - expect: The action item in the 'We need to do...' column has a clickable checkbox next to it
  3. Click the checkbox on an action item
    - expect: The action item is marked as complete (checkbox is checked, and the item may be visually struck through or marked done)

#### 6.2. Exporting retro results from the Done phase

**File:** `specs/done/export-retro.spec.ts`

**Steps:**
  1. Complete a full retro with at least one comment per column (except action items) and one action item, then reach the Done phase
    - expect: The retro is in the Done phase with the 'Export' button visible
  2. Click the 'Export' button
    - expect: The URL changes to /[retro-id]/export
    - expect: An export summary page is displayed with all topics grouped by category (e.g. 'Improve', 'Others', 'Action Items')
  3. Verify the export content matches what was entered
    - expect: Comments from the 'We could improve...' column appear under 'Improve'
    - expect: Comments from 'I want to ask about...' appear under 'Others'
    - expect: Action items from 'We need to do...' appear under 'Action Items'
  4. Click the 'Back' button on the export page
    - expect: User is returned to the retro board in the Done phase

#### 6.3. Starting a linked retro from the Done phase

**File:** `specs/done/start-linked-retro.spec.ts`

**Steps:**
  1. Complete a full retro with one action item 'Follow up on deployment docs', and reach the Done phase
    - expect: The retro is in the Done phase with the 'Start new retro' button visible
  2. Click the 'Start new retro' button
    - expect: A new retro is created with a different UUID-based URL
    - expect: The new retro is in the Brainstorm phase
    - expect: The 'We need to do...' column shows a section labeled 'Action items from previous retro'
    - expect: The previous action item 'Follow up on deployment docs' is listed under the previous action items section with a checkbox

#### 6.4. Starting a linked retro from a custom-named retro

**File:** `specs/done/linked-retro-custom-name.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/test-team-sprint-1
    - expect: A fresh retro board is loaded at the URL
  2. Add a comment, advance through all phases, add an action item 'Define definition of done', then click 'Finish retro' and then 'Start new retro'
    - expect: A new retro is created at https://www.retrotool.app/test-team-sprint-2 (incrementing the number in the name)
    - expect: The new retro shows the previous action item 'Define definition of done' under 'Action items from previous retro'

### 7. Password Protection

**Seed:** `seed.spec.ts`

#### 7.1. Setting a password on a retro

**File:** `specs/password/set-password.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new to create a fresh retro
    - expect: The retro board is displayed
    - expect: The lock icon shows 'Retro not protected by password'
  2. Click the lock/password icon in the header
    - expect: A modal dialog appears with heading 'Do you want to make this retro private?'
    - expect: A note says 'Anyone with access to this retro can set, change or remove a password'
    - expect: A text input with placeholder 'Write password...' is visible
    - expect: Buttons 'Cancel' and 'Set Password' are present
  3. Type 'mypassword123' in the password input and click 'Set Password'
    - expect: The dialog is dismissed
    - expect: The lock icon in the header changes to show 'Retro protected by password'

#### 7.2. Cancelling the password dialog

**File:** `specs/password/cancel-password-dialog.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new, then click the lock icon
    - expect: The password dialog appears
  2. Type 'temppassword' in the input, then click 'Cancel'
    - expect: The dialog is dismissed without saving
    - expect: The lock icon still shows 'Retro not protected by password'

#### 7.3. Accessing a password-protected retro requires a password

**File:** `specs/password/access-protected-retro.spec.ts`

**Steps:**
  1. Create a new retro at a unique custom URL (e.g. https://www.retrotool.app/protected-retro-test), set a password 'secret123', then clear the browser session/cookies and navigate back to https://www.retrotool.app/protected-retro-test
    - expect: A password prompt/dialog appears asking for the password to access the retro
  2. Enter the correct password 'secret123' and submit
    - expect: Access is granted and the retro board is displayed

#### 7.4. Entering wrong password for a protected retro is rejected

**File:** `specs/password/wrong-password.spec.ts`

**Steps:**
  1. Create a new retro at a unique URL, set a password 'correctpassword', clear session, and navigate back to the retro URL
    - expect: A password prompt appears
  2. Enter an incorrect password 'wrongpassword' and submit
    - expect: Access is denied
    - expect: An error message is shown (e.g. 'Incorrect password')
    - expect: The user is not granted access to the retro board

#### 7.5. Changing the password on a protected retro

**File:** `specs/password/change-password.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new, set a password 'oldpassword'
    - expect: The retro is now password protected
  2. Click the lock icon again
    - expect: The password dialog reappears, allowing changes
  3. Type 'newpassword' in the input and click 'Set Password'
    - expect: The dialog is dismissed and the password is updated to 'newpassword'

#### 7.6. Removing password protection from a retro

**File:** `specs/password/remove-password.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new, set a password 'removeMe'
    - expect: The retro is now password protected
  2. Click the lock icon, clear the password input, and click 'Set Password' (or equivalent 'Remove password' action)
    - expect: The password is removed
    - expect: The lock icon changes back to 'Retro not protected by password'

### 8. Info Panel

**Seed:** `seed.spec.ts`

#### 8.1. Opening and closing the info panel

**File:** `specs/info-panel/open-close-info.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new
    - expect: The retro board is displayed
  2. Click the info icon ('More info about Retro tool') in the header
    - expect: An info panel/modal appears with anonymity and privacy information
    - expect: Creator credits with social media links are shown
    - expect: A GitHub link to the open source repo is shown
  3. Click the 'Close' button in the info panel
    - expect: The info panel is dismissed and the retro board is visible again

### 9. Navigation & Routing

**Seed:** `seed.spec.ts`

#### 9.1. Logo link returns to the landing page

**File:** `specs/navigation/logo-navigates-home.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new to create a fresh retro
    - expect: The retro board is displayed
  2. Click the logo in the top-left header
    - expect: User is navigated to the landing page at https://www.retrotool.app/

#### 9.2. Sharing a retro URL allows another user to access the same retro

**File:** `specs/navigation/shared-retro-url.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/new, note the UUID-based URL
    - expect: The retro board is displayed in the Brainstorm phase
  2. Add a comment 'Shared comment from first session' to the first column
    - expect: The comment card appears in the first column
  3. Open the same URL in a second browser tab/window
    - expect: The same retro board is loaded
    - expect: The comment 'Shared comment from first session' is visible (real-time sync)

#### 9.3. Navigating directly to a custom-named retro URL

**File:** `specs/navigation/custom-url-direct-navigation.spec.ts`

**Steps:**
  1. Navigate to https://www.retrotool.app/my-team-name
    - expect: A retro board is created and displayed at the URL https://www.retrotool.app/my-team-name
    - expect: The board is in the Brainstorm phase with no existing comments
  2. Navigate to the same URL https://www.retrotool.app/my-team-name again
    - expect: The same retro board is returned (same comments and phase state persist)
