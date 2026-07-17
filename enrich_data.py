import json
import random

file_path = '/Users/varunseth/.gemini/antigravity/scratch/admin_email_dashboard/public/gmail_data.json'

with open(file_path, 'r') as f:
    data = json.load(f)

mock_bodies = [
    "Hi Varun,\n\nJust following up on our previous conversation regarding the Q3 targets. Let me know when you have time to connect.\n\nBest,\nTeam",
    "Please find attached the latest report. We have seen a 12% increase in MoM growth. Let's discuss this during the standup.",
    "Your recent invoice is attached. Please process this payment within 15 days to avoid late fees.",
    "Welcome to the platform! We are excited to have you on board. Here are a few quick tips to get you started.",
    "Security Alert: A new login was detected on your account from an unrecognized device in Mumbai. If this wasn't you, please reset your password immediately.",
    "Hey Varun, could you forward me the deck Nirmal shared yesterday? Need it for the client pitch at 3 PM.\n\nThanks!"
]

for email in data['emails']:
    if 'body' not in email:
        email['body'] = random.choice(mock_bodies)
        # Create a snippet from body
        email['snippet'] = email['body'][:60].replace('\n', ' ') + '...'

with open(file_path, 'w') as f:
    json.dump(data, f, indent=2)

print("Enriched emails with mock bodies.")
