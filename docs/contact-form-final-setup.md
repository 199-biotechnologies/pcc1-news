# Final Setup for Supabase Contact Form

The code for the contact form component and the Supabase Edge Function has been created and deployed. To make the form fully operational, please complete the following configuration steps within your Supabase project dashboard ([https://supabase.com/dashboard/project/qsygtfdyzyplfhhrifbf/](https://supabase.com/dashboard/project/qsygtfdyzyplfhhrifbf/)).

## 1. Set Supabase Secrets

Navigate to **Project Settings** (the gear icon) -> **Edge Functions** -> **Add New Secret**.

Add the following secrets one by one:

*   **Name:** `HCAPTCHA_SECRET_KEY`
    **Value:** `ES_6cec816bd77e49b780b5be301a480c2b` *(Your provided hCaptcha secret key)*
*   **Name:** `RESEND_API_KEY`
    **Value:** *(Your actual Resend API key obtained from [resend.com](https://resend.com/))*
*   **Name:** `CONTACT_EMAIL_RECIPIENT`
    **Value:** `support@pcc1.news` *(The email address where contact messages should be sent)*
*   **Name:** `CONTACT_EMAIL_SENDER`
    **Value:** *(The email address you have verified with Resend for sending emails, e.g., `noreply@yourdomain.com`)*

## 2. Set Up Database Trigger (Function Hook)

This step connects the `contact_messages` table to the deployed Edge Function, so the function runs automatically whenever a new message is inserted.

1.  Navigate to **Database** (the cylinder icon) -> **Function Hooks**.
2.  Click **Create a new function hook**.
3.  **Name:** Give it a descriptive name, e.g., `trigger_contact_form_handler`.
4.  **Table:** Select `contact_messages` from the dropdown.
5.  **Events:** Check the `INSERT` box.
6.  **Function:** Select the `contact-form-handler` function from the dropdown.
7.  **Authentication:** Choose `service_role` (as the function needs elevated privileges to potentially access secrets and perform actions).
8.  Click **Confirm** to create the hook.

Once these two steps are completed, the contact form on your About page should be fully functional, sending emails via Resend after successful hCaptcha validation.