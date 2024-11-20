frappe.listview_settings["Project Task"] = {
	get_indicator: function (doc) {
		if (
			doc.end_date &&
			frappe.datetime.get_diff(doc.end_date, frappe.datetime.nowdate()) < 0 &&
			doc.status !== "Completed"
		) {
			return ["Overdue", "red", "status,=,Overdue"];
		}
		if (doc.status === "Not Started") {
			return ["Not Started", "blue", "status,=,Not Started"];
		}
		if (doc.status === "In Progress") {
			return ["In Progress", "orange", "status,=,In Progress"];
		}
		if (doc.status === "Completed") {
			return ["Completed", "green", "status,=,Completed"];
		}
	},
};
