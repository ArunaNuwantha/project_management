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
		// Add Complete Task button
		if (frm.doc.status !== "Completed") {
			frm.add_custom_button(__("Complete Task"), function () {
				frm.set_value("status", "Completed");
				frappe.show_alert({
					message: __("Task marked as completed"),
					indicator: "green",
				});

				// Send notification
				frappe.call({
					method: "project_management.api.notify_task_completion",
					args: {
						task: frm.doc.name,
						user: frm.doc.assigned_to,
					},
				});
			});
		}
	},
});
