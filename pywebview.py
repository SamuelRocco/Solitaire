import webview

def create_webview():
    # Create a window with a specified URL
    webview.create_window("Solitaire", "main.html", maximized=True)

if __name__ == '__main__':
    # Create a webview window when the program starts
    create_webview()
    # Run the main loop
    webview.start()
