
import tkinter as tk
from tkinter import messagebox

root = tk.Tk()
root.title("My Simple Calculator")
root.geometry("320x420")
root.resizable(False, False)
root.configure(bg="#f2f4f8")

expression = ""

display = tk.Entry(
    root,
    font=("Arial", 22),
    justify="right",
    bg="white",
    bd=0
)
display.pack(fill="x", padx=15, pady=20, ipady=12)

def click(value):
    global expression

    if value == "C":
        expression = ""
    elif value == "⌫":
        expression = expression[:-1]
    elif value == "=":
        try:
            allowed = "0123456789+-*/.() "
            if any(c not in allowed for c in expression):
                raise ValueError
            result = eval(expression, {"__builtins__": {}})
            expression = str(result)
        except ZeroDivisionError:
            messagebox.showerror("Error", "Cannot divide by zero!")
            expression = ""
        except Exception:
            messagebox.showerror("Error", "Invalid calculation!")
            expression = ""
    else:
        symbols = {"×": "*", "÷": "/", "−": "-"}
        expression += symbols.get(value, value)

    display.delete(0, tk.END)
    display.insert(0, expression)

tk.Label(
    root,
    text="My Simple Calculator",
    font=("Arial", 16, "bold"),
    bg="#f2f4f8"
).pack()

buttons = [
    ["C", "⌫", "÷", "×"],
    ["7", "8", "9", "−"],
    ["4", "5", "6", "+"],
    ["1", "2", "3", "="],
    ["0", ".", "(", ")"]
]

frame = tk.Frame(root, bg="#f2f4f8")
frame.pack(expand=True, fill="both", padx=10, pady=10)

for r, row in enumerate(buttons):
    for c, value in enumerate(row):
        color = "#2474d2" if value == "=" else "#dce7f5" if value in ["C", "⌫", "÷", "×", "−", "+"] else "white"

        btn = tk.Button(
            frame,
            text=value,
            font=("Arial", 15, "bold"),
            bg=color,
            command=lambda v=value: click(v)
        )
        btn.grid(row=r, column=c, sticky="nsew", padx=4, pady=4)

for i in range(5):
    frame.grid_rowconfigure(i, weight=1)

for i in range(4):
    frame.grid_columnconfigure(i, weight=1)

root.mainloop()

