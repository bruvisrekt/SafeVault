--DO ENSURE TO COMMIT AFTER ALL INSERTIONS
INSERT INTO account_owner (owner_id, full_name, email, phone, date_of_birth)
SELECT 1, 'alice johnson', 'alice@email.com', '9876543210', DATE '1990-04-15'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM account_owner WHERE owner_id = 1);

INSERT INTO account_owner (owner_id, full_name, email, phone, date_of_birth)
SELECT 2, 'bob smith', 'bob@email.com', '9123456780', DATE '1985-08-22'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM account_owner WHERE owner_id = 2);

INSERT INTO account_owner (owner_id, full_name, email, phone, date_of_birth)
SELECT 3, 'carol white', 'carol@email.com', '9988776655', DATE '1992-11-30'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM account_owner WHERE owner_id = 3);

INSERT INTO account_owner (owner_id, full_name, email, phone, date_of_birth)
SELECT 4, 'david brown', 'david@email.com', '9001122334', DATE '1978-02-10'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM account_owner WHERE owner_id = 4);

INSERT INTO account_owner (owner_id, full_name, email, phone, date_of_birth)
SELECT 5, 'eva green', 'eva@email.com', '9112233445', DATE '1995-07-19'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM account_owner WHERE owner_id = 5);

INSERT INTO account_owner (owner_id, full_name, email, phone, date_of_birth)
SELECT 1040, 'Shubham Verma', 'shubham.verma@gmail.com', '9876543210', DATE '1995-03-14'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM account_owner WHERE owner_id = 1040);

INSERT INTO account_owner (owner_id, full_name, email, phone, date_of_birth)
SELECT 1041, 'Aakash Sharma', 'aakash.sharma@gmail.com', '9812345678', DATE '1993-07-22'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM account_owner WHERE owner_id = 1041);

INSERT INTO account_owner (owner_id, full_name, email, phone, date_of_birth)
SELECT 1042, 'Lakshya Gupta', 'lakshya.gupta@outlook.com', '9988776655', DATE '1997-11-05'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM account_owner WHERE owner_id = 1042);

INSERT INTO account_owner (owner_id, full_name, email, phone, date_of_birth)
SELECT 1043, 'Arjun Mehta', 'arjun.mehta@yahoo.com', '9001234567', DATE '1990-01-30'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM account_owner WHERE owner_id = 1043);

INSERT INTO account_owner (owner_id, full_name, email, phone, date_of_birth)
SELECT 1044, 'Priya Nair', 'priya.nair@gmail.com', '9123456789', DATE '1996-09-18'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM account_owner WHERE owner_id = 1044);

COMMIT;


INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 101, 'alice savings account', 'financial', 'primary savings account at nationalbank', DATE '2023-01-15', 1
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 101);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 102, 'bob investment portfolio', 'financial', 'stock portfolio at tradecorp', DATE '2023-03-10', 2
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 102);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 103, 'carol fixed deposit', 'financial', 'fixed deposit at citybank', DATE '2023-06-20', 3
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 103);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 104, 'david retirement fund', 'financial', 'retirement fund at wealthbank', DATE '2022-12-15', 4
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 104);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 105, 'eva mutual fund', 'financial', 'mutual fund portfolio at investcorp', DATE '2024-01-20', 5
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 105);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 106, 'alice twitter profile', 'social', 'personal twitter account', DATE '2023-01-20', 1
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 106);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 107, 'bob linkedin profile', 'social', 'professional linkedin account', DATE '2023-03-15', 2
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 107);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 108, 'carol instagram profile', 'social', 'personal instagram account', DATE '2023-06-25', 3
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 108);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 109, 'david facebook profile', 'social', 'personal facebook account', DATE '2022-12-20', 4
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 109);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 110, 'eva github profile', 'social', 'professional github account', DATE '2024-01-25', 5
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 110);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 2001, 'Shubham Instagram', 'Social', 'Personal Instagram account @shubham_verma_', SYSDATE, 1040
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 2001);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 2002, 'HDFC Savings Account', 'Financial', 'Primary HDFC savings account', SYSDATE, 1040
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 2002);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 2003, 'Zerodha Trading Account', 'Financial', 'Equity & mutual fund investments on Zerodha', SYSDATE, 1040
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 2003);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 2004, 'Shubham YouTube Channel', 'Social', 'Tech review YouTube channel - 12k subscribers', SYSDATE, 1040
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 2004);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 2005, 'Aakash Instagram', 'Social', 'Photography Instagram account @aakash.clicks', SYSDATE, 1041
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 2005);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 2006, 'SBI Savings Account', 'Financial', 'State Bank of India primary account', SYSDATE, 1041
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 2006);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 2007, 'Groww Portfolio', 'Financial', 'Mutual funds and SIP investments on Groww', SYSDATE, 1041
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 2007);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 2008, 'Aakash Twitter / X', 'Social', 'Tech opinions & news - @aakash_sharma_x', SYSDATE, 1041
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 2008);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 2009, 'Lakshya Instagram', 'Social', 'Fitness & lifestyle IG @lakshya.lifts', SYSDATE, 1042
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 2009);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 2010, 'ICICI Bank Account', 'Financial', 'ICICI savings + salary account', SYSDATE, 1042
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 2010);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 2011, 'Upstox Demat Account', 'Financial', 'Stocks and ETF holdings on Upstox', SYSDATE, 1042
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 2011);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 2012, 'Lakshya LinkedIn', 'Social', 'Professional profile - Software Engineer', SYSDATE, 1042
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 2012);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 2013, 'Arjun Instagram', 'Social', 'Travel photography IG @arjun_travels', SYSDATE, 1043
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 2013);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 2014, 'Axis Bank FD', 'Financial', 'Fixed deposit - 3 year term', SYSDATE, 1043
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 2014);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 2015, 'Kuvera MF Portfolio', 'Financial', 'Long-term mutual fund portfolio via Kuvera', SYSDATE, 1043
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 2015);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 2016, 'Priya Instagram', 'Social', 'Food & lifestyle blog IG @priya_eats', SYSDATE, 1044
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 2016);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 2017, 'Kotak Savings Account', 'Financial', 'Kotak 811 digital savings account', SYSDATE, 1044
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 2017);

INSERT INTO digital_asset (asset_id, asset_name, asset_type, description, created_at, owner_id)
SELECT 2018, 'Priya YouTube', 'Social', 'Cooking channel - 45k subscribers', SYSDATE, 1044
FROM dual WHERE NOT EXISTS (SELECT 1 FROM digital_asset WHERE asset_id = 2018);

COMMIT;


INSERT INTO asset_metadata (asset_id, meta_key, meta_value)
SELECT 101, 'risk_level', 'low'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_metadata WHERE asset_id = 101 AND meta_key = 'risk_level');

INSERT INTO asset_metadata (asset_id, meta_key, meta_value)
SELECT 101, 'nominee_registered', 'yes'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_metadata WHERE asset_id = 101 AND meta_key = 'nominee_registered');

INSERT INTO asset_metadata (asset_id, meta_key, meta_value)
SELECT 102, 'risk_level', 'high'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_metadata WHERE asset_id = 102 AND meta_key = 'risk_level');

INSERT INTO asset_metadata (asset_id, meta_key, meta_value)
SELECT 102, 'portfolio_type', 'equity'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_metadata WHERE asset_id = 102 AND meta_key = 'portfolio_type');

INSERT INTO asset_metadata (asset_id, meta_key, meta_value)
SELECT 103, 'tenure_years', '3'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_metadata WHERE asset_id = 103 AND meta_key = 'tenure_years');

INSERT INTO asset_metadata (asset_id, meta_key, meta_value)
SELECT 103, 'interest_rate', '7.5'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_metadata WHERE asset_id = 103 AND meta_key = 'interest_rate');

INSERT INTO asset_metadata (asset_id, meta_key, meta_value)
SELECT 104, 'risk_level', 'medium'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_metadata WHERE asset_id = 104 AND meta_key = 'risk_level');

INSERT INTO asset_metadata (asset_id, meta_key, meta_value)
SELECT 104, 'fund_type', 'pension'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_metadata WHERE asset_id = 104 AND meta_key = 'fund_type');

INSERT INTO asset_metadata (asset_id, meta_key, meta_value)
SELECT 105, 'risk_level', 'medium'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_metadata WHERE asset_id = 105 AND meta_key = 'risk_level');

INSERT INTO asset_metadata (asset_id, meta_key, meta_value)
SELECT 105, 'sip_active', 'yes'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_metadata WHERE asset_id = 105 AND meta_key = 'sip_active');

COMMIT;


INSERT INTO platform_profile (platform_name, username, profile_url)
SELECT 'twitter', 'alice_j', 'https://twitter.com/alice_j'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM platform_profile WHERE platform_name = 'twitter' AND username = 'alice_j');

INSERT INTO platform_profile (platform_name, username, profile_url)
SELECT 'linkedin', 'bobsmith', 'https://linkedin.com/in/bobsmith'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM platform_profile WHERE platform_name = 'linkedin' AND username = 'bobsmith');

INSERT INTO platform_profile (platform_name, username, profile_url)
SELECT 'instagram', 'carol_w', 'https://instagram.com/carol_w'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM platform_profile WHERE platform_name = 'instagram' AND username = 'carol_w');

INSERT INTO platform_profile (platform_name, username, profile_url)
SELECT 'facebook', 'david_b', 'https://facebook.com/david_b'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM platform_profile WHERE platform_name = 'facebook' AND username = 'david_b');

INSERT INTO platform_profile (platform_name, username, profile_url)
SELECT 'github', 'eva_g', 'https://github.com/eva_g'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM platform_profile WHERE platform_name = 'github' AND username = 'eva_g');

INSERT INTO platform_profile (platform_name, username, profile_url)
SELECT 'Instagram', 'shubham_verma_', 'https://instagram.com/shubham_verma_'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM platform_profile WHERE platform_name = 'Instagram' AND username = 'shubham_verma_');

INSERT INTO platform_profile (platform_name, username, profile_url)
SELECT 'YouTube', 'ShubhamVermaTech', 'https://youtube.com/@ShubhamVermaTech'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM platform_profile WHERE platform_name = 'YouTube' AND username = 'ShubhamVermaTech');

INSERT INTO platform_profile (platform_name, username, profile_url)
SELECT 'Instagram', 'aakash.clicks', 'https://instagram.com/aakash.clicks'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM platform_profile WHERE platform_name = 'Instagram' AND username = 'aakash.clicks');

INSERT INTO platform_profile (platform_name, username, profile_url)
SELECT 'Twitter', 'aakash_sharma_x', 'https://x.com/aakash_sharma_x'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM platform_profile WHERE platform_name = 'Twitter' AND username = 'aakash_sharma_x');

INSERT INTO platform_profile (platform_name, username, profile_url)
SELECT 'Instagram', 'lakshya.lifts', 'https://instagram.com/lakshya.lifts'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM platform_profile WHERE platform_name = 'Instagram' AND username = 'lakshya.lifts');

INSERT INTO platform_profile (platform_name, username, profile_url)
SELECT 'LinkedIn', 'lakshyagupta', 'https://linkedin.com/in/lakshyagupta'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM platform_profile WHERE platform_name = 'LinkedIn' AND username = 'lakshyagupta');

INSERT INTO platform_profile (platform_name, username, profile_url)
SELECT 'Instagram', 'arjun_travels', 'https://instagram.com/arjun_travels'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM platform_profile WHERE platform_name = 'Instagram' AND username = 'arjun_travels');

INSERT INTO platform_profile (platform_name, username, profile_url)
SELECT 'Instagram', 'priya_eats', 'https://instagram.com/priya_eats'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM platform_profile WHERE platform_name = 'Instagram' AND username = 'priya_eats');

INSERT INTO platform_profile (platform_name, username, profile_url)
SELECT 'YouTube', 'PriyaCooksOfficial', 'https://youtube.com/@PriyaCooksOfficial'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM platform_profile WHERE platform_name = 'YouTube' AND username = 'PriyaCooksOfficial');

COMMIT;


INSERT INTO social_asset (asset_id, platform_name, username)
SELECT 106, 'twitter', 'alice_j'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM social_asset WHERE asset_id = 106);

INSERT INTO social_asset (asset_id, platform_name, username)
SELECT 107, 'linkedin', 'bobsmith'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM social_asset WHERE asset_id = 107);

INSERT INTO social_asset (asset_id, platform_name, username)
SELECT 108, 'instagram', 'carol_w'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM social_asset WHERE asset_id = 108);

INSERT INTO social_asset (asset_id, platform_name, username)
SELECT 109, 'facebook', 'david_b'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM social_asset WHERE asset_id = 109);

INSERT INTO social_asset (asset_id, platform_name, username)
SELECT 110, 'github', 'eva_g'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM social_asset WHERE asset_id = 110);

INSERT INTO social_asset (asset_id, platform_name, username)
SELECT 2001, 'Instagram', 'shubham_verma_'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM social_asset WHERE asset_id = 2001);

INSERT INTO social_asset (asset_id, platform_name, username)
SELECT 2004, 'YouTube', 'ShubhamVermaTech'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM social_asset WHERE asset_id = 2004);

INSERT INTO social_asset (asset_id, platform_name, username)
SELECT 2005, 'Instagram', 'aakash.clicks'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM social_asset WHERE asset_id = 2005);

INSERT INTO social_asset (asset_id, platform_name, username)
SELECT 2008, 'Twitter', 'aakash_sharma_x'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM social_asset WHERE asset_id = 2008);

INSERT INTO social_asset (asset_id, platform_name, username)
SELECT 2009, 'Instagram', 'lakshya.lifts'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM social_asset WHERE asset_id = 2009);

INSERT INTO social_asset (asset_id, platform_name, username)
SELECT 2012, 'LinkedIn', 'lakshyagupta'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM social_asset WHERE asset_id = 2012);

INSERT INTO social_asset (asset_id, platform_name, username)
SELECT 2013, 'Instagram', 'arjun_travels'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM social_asset WHERE asset_id = 2013);

INSERT INTO social_asset (asset_id, platform_name, username)
SELECT 2016, 'Instagram', 'priya_eats'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM social_asset WHERE asset_id = 2016);

INSERT INTO social_asset (asset_id, platform_name, username)
SELECT 2018, 'YouTube', 'PriyaCooksOfficial'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM social_asset WHERE asset_id = 2018);

COMMIT;


INSERT INTO financial_asset (asset_id, institution_name, account_number, asset_value, currency)
SELECT 101, 'nationalbank', 'nb-00123456', 85000.00, 'INR'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM financial_asset WHERE asset_id = 101);

INSERT INTO financial_asset (asset_id, institution_name, account_number, asset_value, currency)
SELECT 102, 'tradecorp', 'tc-00987654', 250000.00, 'INR'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM financial_asset WHERE asset_id = 102);

INSERT INTO financial_asset (asset_id, institution_name, account_number, asset_value, currency)
SELECT 103, 'citybank', 'cb-00456789', 120000.00, 'INR'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM financial_asset WHERE asset_id = 103);

INSERT INTO financial_asset (asset_id, institution_name, account_number, asset_value, currency)
SELECT 104, 'wealthbank', 'wb-00112233', 380000.00, 'INR'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM financial_asset WHERE asset_id = 104);

INSERT INTO financial_asset (asset_id, institution_name, account_number, asset_value, currency)
SELECT 105, 'investcorp', 'ic-00667788', 175000.00, 'INR'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM financial_asset WHERE asset_id = 105);

INSERT INTO financial_asset (asset_id, institution_name, account_number, asset_value, currency)
SELECT 2002, 'HDFC Bank', 'HDFC0019283746', 285000, 'INR'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM financial_asset WHERE asset_id = 2002);

INSERT INTO financial_asset (asset_id, institution_name, account_number, asset_value, currency)
SELECT 2003, 'Zerodha', 'ZR-SH10402024', 142000, 'INR'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM financial_asset WHERE asset_id = 2003);

INSERT INTO financial_asset (asset_id, institution_name, account_number, asset_value, currency)
SELECT 2006, 'State Bank of India', 'SBI00764321890', 198000, 'INR'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM financial_asset WHERE asset_id = 2006);

INSERT INTO financial_asset (asset_id, institution_name, account_number, asset_value, currency)
SELECT 2007, 'Groww', 'GRW-AK10412023', 87500, 'INR'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM financial_asset WHERE asset_id = 2007);

INSERT INTO financial_asset (asset_id, institution_name, account_number, asset_value, currency)
SELECT 2010, 'ICICI Bank', 'ICICI0038471920', 340000, 'INR'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM financial_asset WHERE asset_id = 2010);

INSERT INTO financial_asset (asset_id, institution_name, account_number, asset_value, currency)
SELECT 2011, 'Upstox', 'UPX-LK10422024', 215000, 'INR'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM financial_asset WHERE asset_id = 2011);

INSERT INTO financial_asset (asset_id, institution_name, account_number, asset_value, currency)
SELECT 2014, 'Axis Bank', 'AXIS00192837465', 500000, 'INR'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM financial_asset WHERE asset_id = 2014);

INSERT INTO financial_asset (asset_id, institution_name, account_number, asset_value, currency)
SELECT 2015, 'Kuvera', 'KUV-AR10432024', 320000, 'INR'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM financial_asset WHERE asset_id = 2015);

INSERT INTO financial_asset (asset_id, institution_name, account_number, asset_value, currency)
SELECT 2017, 'Kotak Mahindra Bank', 'KOTAK0047382910', 175000, 'INR'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM financial_asset WHERE asset_id = 2017);

COMMIT;


INSERT INTO asset_credential (asset_id, credential_id, credential_type, credential_value, last_updated)
SELECT 101, 301, 'bank pin', 'enc_pin_a1b2c3', DATE '2024-01-10'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_credential WHERE credential_id = 301);

INSERT INTO asset_credential (asset_id, credential_id, credential_type, credential_value, last_updated)
SELECT 102, 302, 'trading password', 'enc_pass_t1r2d3', DATE '2024-03-15'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_credential WHERE credential_id = 302);

INSERT INTO asset_credential (asset_id, credential_id, credential_type, credential_value, last_updated)
SELECT 103, 303, 'bank pin', 'enc_pin_c3d4e5', DATE '2024-05-20'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_credential WHERE credential_id = 303);

INSERT INTO asset_credential (asset_id, credential_id, credential_type, credential_value, last_updated)
SELECT 106, 304, 'password', 'enc_pass_x9y8z7', DATE '2024-02-20'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_credential WHERE credential_id = 304);

INSERT INTO asset_credential (asset_id, credential_id, credential_type, credential_value, last_updated)
SELECT 107, 305, 'password', 'enc_pass_l4k5j6', DATE '2024-04-01'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_credential WHERE credential_id = 305);

INSERT INTO asset_credential (asset_id, credential_id, credential_type, credential_value, last_updated)
SELECT 2001, 3001, 'password', 'Shubh@Insta2024', SYSDATE
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_credential WHERE credential_id = 3001);

INSERT INTO asset_credential (asset_id, credential_id, credential_type, credential_value, last_updated)
SELECT 2002, 3002, 'bank pin', '7842', SYSDATE
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_credential WHERE credential_id = 3002);

INSERT INTO asset_credential (asset_id, credential_id, credential_type, credential_value, last_updated)
SELECT 2003, 3003, 'trading password', 'Zerodha@Shubh1', SYSDATE
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_credential WHERE credential_id = 3003);

INSERT INTO asset_credential (asset_id, credential_id, credential_type, credential_value, last_updated)
SELECT 2004, 3004, 'password', 'YTube@Shubham99', SYSDATE
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_credential WHERE credential_id = 3004);

INSERT INTO asset_credential (asset_id, credential_id, credential_type, credential_value, last_updated)
SELECT 2005, 3005, 'password', 'Aakash@IG2024', SYSDATE
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_credential WHERE credential_id = 3005);

INSERT INTO asset_credential (asset_id, credential_id, credential_type, credential_value, last_updated)
SELECT 2006, 3006, 'bank pin', '3391', SYSDATE
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_credential WHERE credential_id = 3006);

INSERT INTO asset_credential (asset_id, credential_id, credential_type, credential_value, last_updated)
SELECT 2007, 3007, 'trading password', 'Groww@Aakash7', SYSDATE
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_credential WHERE credential_id = 3007);

INSERT INTO asset_credential (asset_id, credential_id, credential_type, credential_value, last_updated)
SELECT 2009, 3008, 'password', 'Lakshya@Lifts1', SYSDATE
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_credential WHERE credential_id = 3008);

INSERT INTO asset_credential (asset_id, credential_id, credential_type, credential_value, last_updated)
SELECT 2010, 3009, 'bank pin', '5514', SYSDATE
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_credential WHERE credential_id = 3009);

INSERT INTO asset_credential (asset_id, credential_id, credential_type, credential_value, last_updated)
SELECT 2011, 3010, 'trading password', 'Upstox@Laks22', SYSDATE
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_credential WHERE credential_id = 3010);

INSERT INTO asset_credential (asset_id, credential_id, credential_type, credential_value, last_updated)
SELECT 2013, 3011, 'password', 'Arjun@Travel24', SYSDATE
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_credential WHERE credential_id = 3011);

INSERT INTO asset_credential (asset_id, credential_id, credential_type, credential_value, last_updated)
SELECT 2016, 3012, 'password', 'Priya@FoodIG99', SYSDATE
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_credential WHERE credential_id = 3012);

INSERT INTO asset_credential (asset_id, credential_id, credential_type, credential_value, last_updated)
SELECT 2017, 3013, 'bank pin', '8827', SYSDATE
FROM dual WHERE NOT EXISTS (SELECT 1 FROM asset_credential WHERE credential_id = 3013);

COMMIT;


INSERT INTO beneficiary (beneficiary_id, full_name, email, relationship_to_owner, verification_status)
SELECT 401, 'tom johnson', 'tom@email.com', 'spouse', 'verified'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM beneficiary WHERE beneficiary_id = 401);

INSERT INTO beneficiary (beneficiary_id, full_name, email, relationship_to_owner, verification_status)
SELECT 402, 'sara johnson', 'sara@email.com', 'child', 'verified'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM beneficiary WHERE beneficiary_id = 402);

INSERT INTO beneficiary (beneficiary_id, full_name, email, relationship_to_owner, verification_status)
SELECT 403, 'mike smith', 'mike@email.com', 'sibling', 'pending'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM beneficiary WHERE beneficiary_id = 403);

INSERT INTO beneficiary (beneficiary_id, full_name, email, relationship_to_owner, verification_status)
SELECT 404, 'nina brown', 'nina@email.com', 'spouse', 'verified'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM beneficiary WHERE beneficiary_id = 404);

INSERT INTO beneficiary (beneficiary_id, full_name, email, relationship_to_owner, verification_status)
SELECT 405, 'leo green', 'leo@email.com', 'child', 'pending'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM beneficiary WHERE beneficiary_id = 405);

INSERT INTO beneficiary (beneficiary_id, full_name, email, relationship_to_owner, verification_status)
SELECT 501, 'Riya Verma', 'riya.verma@gmail.com', 'sibling', 'verified'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM beneficiary WHERE beneficiary_id = 501);

INSERT INTO beneficiary (beneficiary_id, full_name, email, relationship_to_owner, verification_status)
SELECT 502, 'Meera Sharma', 'meera.sharma@gmail.com', 'spouse', 'pending'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM beneficiary WHERE beneficiary_id = 502);

INSERT INTO beneficiary (beneficiary_id, full_name, email, relationship_to_owner, verification_status)
SELECT 503, 'Rohit Gupta', 'rohit.gupta@gmail.com', 'sibling', 'verified'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM beneficiary WHERE beneficiary_id = 503);

INSERT INTO beneficiary (beneficiary_id, full_name, email, relationship_to_owner, verification_status)
SELECT 504, 'Sneha Mehta', 'sneha.mehta@yahoo.com', 'spouse', 'verified'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM beneficiary WHERE beneficiary_id = 504);

INSERT INTO beneficiary (beneficiary_id, full_name, email, relationship_to_owner, verification_status)
SELECT 505, 'Kavya Nair', 'kavya.nair@gmail.com', 'sibling', 'pending'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM beneficiary WHERE beneficiary_id = 505);

COMMIT;


INSERT INTO designated_heir (asset_id, beneficiary_id, inheritance_percent, access_level)
SELECT 101, 401, 60.00, 'full'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM designated_heir WHERE asset_id = 101 AND beneficiary_id = 401);

INSERT INTO designated_heir (asset_id, beneficiary_id, inheritance_percent, access_level)
SELECT 101, 402, 40.00, 'full'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM designated_heir WHERE asset_id = 101 AND beneficiary_id = 402);

INSERT INTO designated_heir (asset_id, beneficiary_id, inheritance_percent, access_level)
SELECT 102, 403, 100.00, 'full'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM designated_heir WHERE asset_id = 102 AND beneficiary_id = 403);

INSERT INTO designated_heir (asset_id, beneficiary_id, inheritance_percent, access_level)
SELECT 103, 404, 100.00, 'read'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM designated_heir WHERE asset_id = 103 AND beneficiary_id = 404);

INSERT INTO designated_heir (asset_id, beneficiary_id, inheritance_percent, access_level)
SELECT 104, 405, 100.00, 'full'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM designated_heir WHERE asset_id = 104 AND beneficiary_id = 405);

INSERT INTO designated_heir (asset_id, beneficiary_id, inheritance_percent, access_level)
SELECT 2001, 501, 100, 'full'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM designated_heir WHERE asset_id = 2001 AND beneficiary_id = 501);

INSERT INTO designated_heir (asset_id, beneficiary_id, inheritance_percent, access_level)
SELECT 2002, 501, 100, 'full'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM designated_heir WHERE asset_id = 2002 AND beneficiary_id = 501);

INSERT INTO designated_heir (asset_id, beneficiary_id, inheritance_percent, access_level)
SELECT 2003, 501, 100, 'full'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM designated_heir WHERE asset_id = 2003 AND beneficiary_id = 501);

INSERT INTO designated_heir (asset_id, beneficiary_id, inheritance_percent, access_level)
SELECT 2005, 502, 100, 'full'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM designated_heir WHERE asset_id = 2005 AND beneficiary_id = 502);

INSERT INTO designated_heir (asset_id, beneficiary_id, inheritance_percent, access_level)
SELECT 2006, 502, 100, 'full'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM designated_heir WHERE asset_id = 2006 AND beneficiary_id = 502);

INSERT INTO designated_heir (asset_id, beneficiary_id, inheritance_percent, access_level)
SELECT 2009, 503, 100, 'full'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM designated_heir WHERE asset_id = 2009 AND beneficiary_id = 503);

INSERT INTO designated_heir (asset_id, beneficiary_id, inheritance_percent, access_level)
SELECT 2010, 503, 100, 'full'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM designated_heir WHERE asset_id = 2010 AND beneficiary_id = 503);

INSERT INTO designated_heir (asset_id, beneficiary_id, inheritance_percent, access_level)
SELECT 2011, 503, 100, 'full'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM designated_heir WHERE asset_id = 2011 AND beneficiary_id = 503);

INSERT INTO designated_heir (asset_id, beneficiary_id, inheritance_percent, access_level)
SELECT 2013, 504, 100, 'full'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM designated_heir WHERE asset_id = 2013 AND beneficiary_id = 504);

INSERT INTO designated_heir (asset_id, beneficiary_id, inheritance_percent, access_level)
SELECT 2014, 504, 100, 'full'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM designated_heir WHERE asset_id = 2014 AND beneficiary_id = 504);

INSERT INTO designated_heir (asset_id, beneficiary_id, inheritance_percent, access_level)
SELECT 2016, 505, 100, 'full'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM designated_heir WHERE asset_id = 2016 AND beneficiary_id = 505);

INSERT INTO designated_heir (asset_id, beneficiary_id, inheritance_percent, access_level)
SELECT 2017, 505, 100, 'full'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM designated_heir WHERE asset_id = 2017 AND beneficiary_id = 505);

COMMIT;


INSERT INTO access_trigger (trigger_id, owner_id, rule_type, rule_condition, trigger_status, last_activity_date)
SELECT 201, 1, 'inactivity', 'no login for 180 days', 'active', DATE '2024-06-01'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM access_trigger WHERE trigger_id = 201);

INSERT INTO access_trigger (trigger_id, owner_id, rule_type, rule_condition, trigger_status, last_activity_date)
SELECT 202, 2, 'death certificate', 'verified death certificate submitted', 'active', DATE '2024-08-15'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM access_trigger WHERE trigger_id = 202);

INSERT INTO access_trigger (trigger_id, owner_id, rule_type, rule_condition, trigger_status, last_activity_date)
SELECT 203, 3, 'inactivity', 'no login for 365 days', 'inactive', DATE '2023-12-01'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM access_trigger WHERE trigger_id = 203);

INSERT INTO access_trigger (trigger_id, owner_id, rule_type, rule_condition, trigger_status, last_activity_date)
SELECT 204, 4, 'legal order', 'court order received', 'active', DATE '2024-09-10'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM access_trigger WHERE trigger_id = 204);

INSERT INTO access_trigger (trigger_id, owner_id, rule_type, rule_condition, trigger_status, last_activity_date)
SELECT 205, 5, 'inactivity', 'no login for 270 days', 'active', DATE '2024-10-05'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM access_trigger WHERE trigger_id = 205);

INSERT INTO access_trigger (trigger_id, owner_id, rule_type, rule_condition, trigger_status, last_activity_date)
SELECT 6001, 1040, 'inactivity', 'no login for 180 days', 'active', SYSDATE
FROM dual WHERE NOT EXISTS (SELECT 1 FROM access_trigger WHERE trigger_id = 6001);

INSERT INTO access_trigger (trigger_id, owner_id, rule_type, rule_condition, trigger_status, last_activity_date)
SELECT 6002, 1041, 'inactivity', 'no login for 365 days', 'active', SYSDATE
FROM dual WHERE NOT EXISTS (SELECT 1 FROM access_trigger WHERE trigger_id = 6002);

INSERT INTO access_trigger (trigger_id, owner_id, rule_type, rule_condition, trigger_status, last_activity_date)
SELECT 6003, 1042, 'inactivity', 'no login for 180 days', 'active', SYSDATE
FROM dual WHERE NOT EXISTS (SELECT 1 FROM access_trigger WHERE trigger_id = 6003);

INSERT INTO access_trigger (trigger_id, owner_id, rule_type, rule_condition, trigger_status, last_activity_date)
SELECT 6004, 1043, 'inactivity', 'no login for 90 days', 'active', SYSDATE
FROM dual WHERE NOT EXISTS (SELECT 1 FROM access_trigger WHERE trigger_id = 6004);

INSERT INTO access_trigger (trigger_id, owner_id, rule_type, rule_condition, trigger_status, last_activity_date)
SELECT 6005, 1044, 'inactivity', 'no login for 180 days', 'active', SYSDATE
FROM dual WHERE NOT EXISTS (SELECT 1 FROM access_trigger WHERE trigger_id = 6005);

COMMIT;


SELECT 'SafeVault sample data inserted successfully.' AS status FROM dual;
