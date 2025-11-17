export const CreateUserTicketTemplate = `Please create a new user for my team. Their particulars are below.
<br /><br />
<b>New user information</b><br/>
First name: [[firstName]]<br />
Last name: [[lastName]]<br />
Email: [[email]]<br />
Title: [[title]]<br />
Access level: [[permissions]]. <br /><br />
Please effect this change immediately.`;

export const GiveRaiseTicketTemplate = `
I wish to give a raise of $[[raiseAmount]].
<br /><br />
<b>Staff information</b><br/>
<b>Name</b>: [[employeeName]]<br />
<b>Email</b>: [[employeeEmail]]<br />
<b>Employee ID</b>: [[employeeID]]<br />
<b>Billing Date:</b> [[effectiveDate]]<br />
<br /><br />`;

export const GiveBonusTicketTemplate = `
Give a bonus to the following staff:<br/>
<b>Name:</b> [[employeeName]]<br />
<b>Email:</b> [[employeeEmail]]<br />
<b>Agent ID:</b> [[employeeID]]<br />
<b>Bonus:</b> $[[bonusAmount]]<br />
<b>Billing Date:</b> [[effectiveDate]]<br />
<br /><br />`;

export const GiveBirthdayGiftTicketTemplate = `
Give a birthday gift bonus to the following staff:<br/>
<b>Name:</b> [[employeeName]]<br />
<b>Email:</b> [[employeeEmail]]<br />
<b>Agent ID:</b> [[employeeID]]<br />
<b>Bonus:</b> $[[bonusAmount]]<br />
<b>Billing Date:</b> [[effectiveDate]]<br />
<br /><br />`;

export const NewVirtualStaffTicketTemplate = `
Please help us hire [[numberOfStaff]] new virtual staff. Our law firm's information is below.<br /><br />
<b>Basic information</b><br/>
Practice area: [[practiceArea]]<br />
Virtual staff department: [[department]]<br />
Virtual staff position: [[position]]<br />
Required Training: [[requiredTraining]]<br />
Virtual staff language: [[language]]<br />
Work on weekdays: [[weekdays]]<br />
Work on weekends: [[weekends]]<br />
Work days: [[days]]<br />
Work start time: [[startTime]]<br />
Work end time: [[endTime]]<br />
Timezone: [[timezone]]<br />
<br/>
<b>Software information</b><br/>
Case management software: [[caseSoftware]]<br/>
Communication software: [[communicationSoftware]]<br/>
Email service: [[emailService]]<br />
Any other software: [[otherSoftware]]<br/><br/>
<b>Law firm information</b><br/>
Name: [[lawFirmName]]<br/>
Staff size: [[lawFirmSize]]<br/><br/>
<b>Point of contact information</b><br/>
POC Name: [[pocName]]<br/>
POC Position: [[pocPosition]]<br/>
POC Email: [[pocEmail]]<br />
POC Phone number: [[pocPhone]]<br />
Contract signed: [[contractSigned]]<br />
Referred By: [[referredBy]]<br/><br/>
<br /><br />`;

export const NewVirtualStaffTicketTemplateFirstTime = `
Please help us hire [[numberOfStaff]] new virtual staff. Our law firm's information is below.<br /><br />
<b>Basic information</b><br/>
Practice area: [[practiceArea]]<br />
Virtual staff department: [[department]]<br />
Virtual staff position: [[position]]<br />
Required Training: [[requiredTraining]]<br />
Virtual staff language: [[language]]<br />
Work on weekdays: [[weekdays]]<br />
Work on weekends: [[weekends]]<br />
Work days: [[days]]<br />
Work start time: [[startTime]]<br />
Work end time: [[endTime]]<br />
Timezone: [[timezone]]<br />
<br/>
<b>Software information</b><br/>
Case management software: [[caseSoftware]]<br/>
Communication software: [[communicationSoftware]]<br/>
Email service: [[emailService]]<br />
Any other software: [[otherSoftware]]<br/><br/>
<b>Law firm information</b><br/>
Name: [[lawFirmName]]<br/>
Staff size: [[lawFirmSize]]<br/><br/>
<b>Point of contact information</b><br/>
POC Name: [[pocName]]<br/>
POC Position: [[pocPosition]]<br/>
POC Email: [[pocEmail]]<br />
POC Phone number: [[pocPhone]]<br />
Contract signed: [[contractSigned]]<br />
Referred By: [[referredBy]]<br/><br/>
<b>Setup Fee Payment</b><br/>
Payment completed: [[paymentStatus]]<br/>
Amount: [[amount]]<br/><br/>
<b>Contract</b><br/>
Yes: [<a target="_blank" rel="noopener noreferrer" href="[[contractUrl]]" class="!text-[#09418D] underline font-semibold">See the Contract</a>]<br/>`;

export const replacePlaceholders = (
  template: string,
  data: Record<string, string>,
) => {
  return template.replace(/\[\[(\w+)\]\]/g, (_, key) => data[key] || "");
};
