# Base62 Short Code Generator
A method to generate a 9-character (or less) short code from a 16-digit integer code.

# Scenario
You are required to generate promo codes for XYZ Cafe. XYZ Cafe has 300 branches. For each branch, XYZ cafe decides to release 10,000 promo codes per day for coffee lovers. Each promo code is unique and must include the following information: date(YYYY, MM and DD), branch ID (1-300), and released number(1-10000). The length of each promo code should also be no more than 9 characters. (Modified from an interview question.)

# Solution
The promo code could be first constructed as a 16-digit long code YYYYMMDDXXXZZZZZ. YYYY is for the year, MM is for the month, DD is for the date, XXX is for the branch ID, and ZZZZZ is for the release number. Therefore, the max value of this code is 9999123130010000. By using base conversion, we could know base 62 is more than enough to represent the max value of the promo code (61*62^8 >> 9999123130010000). Therefore, we could define a base 62 converting method to solve this question.
