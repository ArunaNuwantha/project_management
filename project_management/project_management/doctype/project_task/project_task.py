from frappe.frappe.model.document import Document
import frappe
from frappe import _


class ProjectTask(Document):
    def validate(self):
        self.validate_dates()

    def validate_dates(self):
        if self.start_date and self.end_date:
            if self.end_date < self.start_date:
                frappe.throw(_("End Date cannot be before Start Date"))
