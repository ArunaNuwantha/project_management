# Copyright (c) 2024, Aruna Nuwantha and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ProjectTask(Document):
    def validate(self):
        self.validate_dates()

    def validate_dates(self):
        if self.start_date and self.end_date:
            if self.end_date < self.start_date:
                frappe.throw("End Date cannot be before Start Date")
