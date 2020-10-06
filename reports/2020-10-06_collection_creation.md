### Collection creation steps and potential UI
This page documents steps needed to create a new collection in Merritt, and groups them into sets of procedures that could be part of a web form-based UX. Each form page 

- The precursor information needed to begin these procedures is collection documentation. e.g. https://docs.google.com/document/d/1qBpwJRp2Fi7v72XUAlmVwBCEUETdX1HbX2xS04yPPPc/edit?usp=sharing

- And a collection ARK, which is obtained by logging into EZID via the Merritt user and generating a new Merritt Collection identifier.

#### Form page 1: Obtain Collection ARK from EZID, and enter Collection profile and Input profile information
Most of the information in the Collection profile will carry over to the Input profile.
###### Section 1, EZID:
- Present a button that triggers obtaining an ARK from EZID. It returns an ARK for copy/pasting into the subsequent collection profile section (or could pre-populated the corresponding field there).
###### Section 2 for Collection profile:
- Environment: Choose Production or Stage from a drop down menu
- Collection mnemonic
- Collection description: Free text field
- Collection ARK
- Collection owner ARK
- Admin notification email addresses: Merritt team email addresses, comma-delineated
- Primary Storage node: e.g 9501
- Creation Date and Modification Date (dynamically generated on form submission)
###### Section 3 for Input profile:
- End user notification email addresses: End/campus user email addresses 

Completing and triggering the form via a button results in two blocks of text: one for the Collection profile, and the other an Input profile. Initially, it will be up to the user to check in Collection and Input profile files to github using this text. At a later stage in development, it would be ideal to have the form trigger check-in.

#### Form page 2: Generate LDAP entries for collection
This second form will be used to generate LDAP entries. It should contain text entry file
