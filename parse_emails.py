import json
import re
from datetime import datetime

input_file = '/Users/varunseth/.gemini/antigravity/brain/e0962926-8b41-413c-8a72-f37fbdbf1d11/.system_generated/steps/94/output.txt'
output_file = '/Users/varunseth/.gemini/antigravity/scratch/admin_email_dashboard/public/gmail_data.json'

emails = []
current_email = {}

with open(input_file, 'r') as f:
    for line in f:
        line = line.strip()
        if not line:
            if current_email:
                emails.append(current_email)
                current_email = {}
            continue
        
        if line.startswith('ID: '):
            current_email['id'] = line[4:]
        elif line.startswith('Subject: '):
            current_email['subject'] = line[9:]
        elif line.startswith('From: '):
            full_from = line[6:]
            current_email['from_raw'] = full_from
            
            # Extract name and email
            match = re.match(r'(.*?)<(.*?)>', full_from)
            if match:
                current_email['sender_name'] = match.group(1).strip().strip('"')
                current_email['sender_email'] = match.group(2).strip()
            else:
                current_email['sender_name'] = full_from
                current_email['sender_email'] = full_from
                
            # Extract domain
            if '@' in current_email['sender_email']:
                current_email['domain'] = current_email['sender_email'].split('@')[1]
            else:
                current_email['domain'] = 'unknown'
                
        elif line.startswith('Date: '):
            # Just store raw date for now, or simplify it
            current_email['date_raw'] = line[6:]
            
if current_email:
    emails.append(current_email)

# Data Enrichment (CRM features)
for e in emails:
    subject = e.get('subject', '').lower()
    
    # Priority
    if any(k in subject for k in ['urgent', 'important', 'action', 'require', 'failed']):
        e['priority'] = 'High'
    elif any(k in subject for k in ['meeting', 'call', 'invite', 'zoom', 'discuss']):
        e['priority'] = 'Medium'
    else:
        e['priority'] = 'Low'
        
    # Sentiment
    if any(k in subject for k in ['alert', 'error', 'fail', 'issue']):
        e['sentiment'] = 'Negative'
    elif any(k in subject for k in ['success', 'welcome', 'thanks', 'congratulations']):
        e['sentiment'] = 'Positive'
    else:
        e['sentiment'] = 'Neutral'
        
    # Category
    if any(k in subject for k in ['newsletter', 'daily', 'weekly', 'digest']):
        e['category'] = 'Newsletter'
    elif 'alert' in subject or 'security' in subject:
        e['category'] = 'Alert'
    elif 'bill' in subject or 'invoice' in subject or 'payment' in subject:
        e['category'] = 'Billing'
    else:
        e['category'] = 'General'

with open(output_file, 'w') as f:
    json.dump({'emails': emails}, f, indent=2)

print(f"Successfully parsed {len(emails)} emails into {output_file}")
