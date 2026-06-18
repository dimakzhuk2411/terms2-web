export const Roles = {
    Employees: "Employees",
    EmployeesView: "Employees.View",
    EmployeesEdit: "Employees.Edit",
    EmployeesDelete: "Employees.Delete",
    Complexes: "Complexes",
    ComplexesEdit: "Complexes.Edit",
    ComplexesDelete: "Complexes.Delete"
} as const;

export type Role = typeof Roles[keyof typeof Roles]