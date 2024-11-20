import frappe
from frappe.query_builder import DocType


@frappe.whitelist()
def get_user_tasks(user_id):
    ProjectTask = DocType("Project Task")
    query = (
        frappe.qb.from_(ProjectTask)
        .select(
            ProjectTask.task_name,
            ProjectTask.project,
            ProjectTask.start_date,
            ProjectTask.end_date,
            ProjectTask.status,
        )
        .where(ProjectTask.assigned_to == user_id)
    )

    tasks = query.run(as_dict=True)
    return tasks


@frappe.whitelist()
def get_in_progress_tasks():
    ProjectTask = DocType("Project Task")

    query = (
        frappe.qb.from_(ProjectTask)
        .select(
            ProjectTask.name,
            ProjectTask.task_name,
            ProjectTask.project,
            ProjectTask.start_date,
            ProjectTask.end_date,
        )
        .where(
            (ProjectTask.status == "In Progress")
            & (ProjectTask.assigned_to == frappe.session.user)
        )
    )

    return query.run(as_dict=True)


@frappe.whitelist()
def notify_task_completion(task, user):
    notification = {
        "type": "Alert",
        "subject": f"Task {task} Completed",
        "for_user": user,
        "email_content": f"The task {task} has been marked as completed.",
    }

    frappe.publish_realtime(
        event="eval_js", message=f"frappe.show_alert('{notification}')"
    )
