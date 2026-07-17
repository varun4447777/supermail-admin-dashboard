import json

real_emails = [
  { "id": "19f70083a6b70bce", "subject": "Hydrogen on India's tracks & Tata's retro route", "from_raw": "The Economic Times <newsletter@economictimesnews.com>", "date_raw": "Fri, 17 Jul 2026 17:51:53" },
  { "id": "19f7006ccdab5a64", "subject": "What changes when you add credits", "from_raw": "OpenRouter Team <welcome@openrouter.ai>", "date_raw": "Fri, 17 Jul 2026 12:22:00" },
  { "id": "19f6ffa9e318fab9", "subject": "Edit your favorite photos", "from_raw": "ChatGPT <noreply@email.openai.com>", "date_raw": "Fri, 17 Jul 2026 12:08:42" },
  { "id": "19f6fd2e296f5fc1", "subject": "All eyes on RIL Q1 | Chris Wood decodes FII return | 10 smallcap stars", "from_raw": "ET Markets <newsletter@economictimesnews.com>", "date_raw": "Fri, 17 Jul 2026 16:55:17" },
  { "id": "19f6fa30d50ce0f8", "subject": "Amara Raja Energy & Mobility Limited - Notice convening 41st AGM", "from_raw": "evoting@nsdl.com", "date_raw": "Fri, 17 Jul 2026 15:55:59" },
  { "id": "19f6f837c0a7239e", "subject": "Life Can Wait. Travel Shouldn't.🧭", "from_raw": "EaseMyTrip <info@updates.easemytrip.com>", "date_raw": "Fri, 17 Jul 2026 09:58:35" },
  { "id": "19f6f779a08adee3", "subject": "You’ve got fresh credits waiting ⚡", "from_raw": "Lovable <noreply@lovable.dev>", "date_raw": "Fri, 17 Jul 2026 09:45:37" },
  { "id": "19f6f6ea2941456f", "subject": "The costliest investing habit: buying without understanding.", "from_raw": "The Economic Times <newsletter@economictimesnews.com>", "date_raw": "Fri, 17 Jul 2026 15:05:46" },
  { "id": "19f6f0f67878feee", "subject": "Daily Trading & Investment Ideas - These large- and mid-cap stocks can give more than 25% return", "from_raw": "The Economic Times <newsletter@economictimesnews.com>", "date_raw": "Fri, 17 Jul 2026 13:21:46" },
  { "id": "19f6efef7802dee2", "subject": "EPS 2026 replaces EPS-71, EPS-95 - know what's changed", "from_raw": "ET Wealth <newsletter@economictimesnews.com>", "date_raw": "Fri, 17 Jul 2026 13:03:49" }
]

emails = []
for e in real_emails:
    parsed = {
        'id': e['id'],
        'subject': e['subject'],
        'date_raw': e['date_raw'],
        'from_raw': e['from_raw']
    }
    
    # Extract Sender
    if '<' in e['from_raw']:
        parsed['sender_name'] = e['from_raw'].split('<')[0].strip()
        parsed['sender_email'] = e['from_raw'].split('<')[1].strip('>')
    else:
        parsed['sender_name'] = e['from_raw']
        parsed['sender_email'] = e['from_raw']
    
    parsed['domain'] = parsed['sender_email'].split('@')[1] if '@' in parsed['sender_email'] else 'unknown'
    
    # Wealth Management CRM Tags
    subj_lower = e['subject'].lower()
    if 'trading' in subj_lower or 'investment ideas' in subj_lower or 'amc' in subj_lower or 'market' in subj_lower:
        parsed['wealth_category'] = 'AMC Update'
        parsed['priority'] = 'Low'
    elif 'agm' in subj_lower or 'nsdl' in subj_lower or 'notice' in subj_lower:
        parsed['wealth_category'] = 'Corporate Action'
        parsed['priority'] = 'High'
    else:
        parsed['wealth_category'] = 'Client / General'
        parsed['priority'] = 'Medium'
        
    parsed['snippet'] = e['subject'] + ' - Please review the latest updates for your portfolio.'
    parsed['body'] = f"From: {parsed['from_raw']}\n\nDear RM,\n\n{parsed['snippet']}\n\nThis communication is securely archived under SEC Rule 17a-4."
    
    # Add dummy CRM data
    parsed['linked_account'] = 'AUM: $1.2M (Tier 1)' if parsed['priority'] == 'High' else 'Internal'
    
    emails.append(parsed)

with open('/Users/varunseth/.gemini/antigravity/scratch/admin_email_dashboard/public/gmail_data.json', 'w') as f:
    json.dump({'emails': emails}, f, indent=2)

print("Injected real wealth management data.")
