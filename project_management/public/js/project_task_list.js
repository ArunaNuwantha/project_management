frappe.listview_settings["Project Task"] = {
	get_indicator: function (doc) {
		if (doc.status === "Completed") {
			return [__("Completed"), "green", "status,=,Completed"];
		} else if (
			doc.end_date &&
			frappe.datetime.get_diff(doc.end_date, frappe.datetime.nowdate()) < 0
		) {
			return [__("Overdue"), "red", "end_date,<,Today"];
		} else if (doc.status === "In Progress") {
			return [__("In Progress"), "orange", "status,=,In Progress"];
		}
		return [__("Not Started"), "gray", "status,=,Not Started"];
	},
};
