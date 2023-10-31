for further information please refer to the [official extension documentation](https://github.com/Huachao/vscode-restclient).

## Setting up the extension

Open the exetension tab and search for `rest client` and install the extension.

## Using the extension

### locating the available requests
Create a new file and save it with the extension `.http` and start writing your requests. You can refer to the exisiting files in the `requests` folder for examples.

### executing the requests
To execute the requests you can use the shortcut `Ctrl + Alt + R` or `Cmd + Alt + R` on mac.

### where can you find info about the extension
In case you do not find what you are looking for, please refer to the [official extension documentation](https://github.com/Huachao/vscode-restclient)

It is also pretty desirable that you take a look at the documentation in order to be able to help the team use the extension to its full potential.

## Understanding environments

### Switching between environments
To switch between environments you can execute the command `REST Client: Switch Environment` and select the environment you want to use.

TIP: To execute a command in vscode you can use the shortcut `Ctrl + Shift + P` or `Cmd + Shift + P` on mac.

### Managing or updating environments
To manage or update enviroments and environemnt variables, open the file settings.json on .vscode folder and update the "rest-client.environmentVariables" section.