export const Roles = {
    Employees: "Employees",
    EmployeesView: "Employees.View",
    EmployeesEdit: "Employees.Edit",
    EmployeesDelete: "Employees.Delete",
    Complexes: "Complexes",
    ComplexesEdit: "Complexes.Edit",
    ComplexesDelete: "Complexes.Delete",
    SKZI: "SKZI",
    SKZIEdit: "SKZI.Edit"
} as const;

export type Role = typeof Roles[keyof typeof Roles]