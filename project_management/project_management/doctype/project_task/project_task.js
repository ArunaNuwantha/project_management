// Copyright (c) 2024, Aruna Nuwantha and contributors
// For license information, please see license.txt

frappe.ui.form.on("Project Task", {
	start_date: function (frm) {
		if (frm.doc.start_date && frm.doc.status === "Not Started") {
			frm.set_value("status", "In Progress");
		}
	},

	end_date: function (frm) {
		if (frm.doc.end_date) {
			frm.set_value("status", "Completed");
		}
	},
	refresh: function (frm) {
		if (frm.doc.status !== "Completed") {
			frm.add_custom_button(__("Mark as Completed"), function () {
				frappe.confirm(
					__("Are you sure you want to mark this task as Completed?"),
					function () {
						frm.set_value("status", "Completed");
						frm.save().then(() => {
							frappe.msgprint(__("Task has been marked as Completed."));
							if (frm.doc.assigned_to) {
								frappe.call({
									method: "frappe.core.doctype.communication.email.make",
									args: {
										recipients: frm.doc.assigned_to,
										subject: `Task "${frm.doc.task_name}" Completed`,
										content: `The task "${frm.doc.task_name}" has been marked as completed.`,
									},
								});
							}
						});
					}
				);
			}).addClass("btn-primary");
		}

		// Button to resend a notification
		frm.add_custom_button(__("Resend Notification"), function () {
			frappe.call({
				method: "frappe.core.doctype.communication.email.make",
				args: {
					recipients: frm.doc.assigned_to,
					subject: `Reminder for Task "${frm.doc.task_name}"`,
					content: `This is a reminder for the task "${frm.doc.task_name}".`,
				},
				callback: function () {
					frappe.msgprint(__("Notification resent successfully."));
				},
			});
		}).addClass("btn-secondary");
	},
});
