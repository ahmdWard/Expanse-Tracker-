# CLI Expense Tracker

Solution for expense tracker from [roadmap.sh](https://roadmap.sh/projects/expense-tracker)

A command-line interface (CLI) application for managing expenses. This project allows you to add, list, update, delete, and summarize expenses. It also includes functionality for exporting data to a CSV file.

## Features

- Add new expenses
- List all expenses
- Get a summary of total expenses
- Get a summary of expenses by category
- Get a summary of expenses for a specific month
- Delete an expense
- Update an existing expense
- Export expense data to a CSV file

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

## Usage

### Adding a New Expense

```bash
node index.js add --description "<description>" --category "<category>" --amount <amount>
```
### Listing All Expenses

```bash
node index.js list
```
### Getting a Summary of All Expenses

```bash
node index.js summary
```
### Getting a Summary of Expenses by Category

```bash
node index.js summary-category --category "<category>"
```

### Getting a Summary of Expenses for a Specific Month

```bash 
node index.js summary-month --month <month>
```

### Deleting an Expense

```bash
node index.js delete --id <id>
```

### Updating an Expense

```bash
node index.js update --id <id> [--description "<description>"] [--category "<category>"] [--amount <amount>]
```

### Exporting Data to CSV

```bash
node index.js export-csv
```

## Contributing

Feel free to submit issues or pull requests. Contributions are welcome!