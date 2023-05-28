'use strict';
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.activate = void 0;
var vscode = require("vscode");
const classicFunctionNameString = 'function';

function activate(context) {
    var disposable = vscode.commands.registerCommand('testimony-js.helloWorld', function () {
        // Get the active text editor
        var editor = vscode.window.activeTextEditor;

        let functionName = classicFunctionNameString;
        let authorName = 'Gobinda Nandi';
        let authorEmail = 'gobinda@email.com';



        let currentLine = editor.document.lineAt(editor.selection.active.line);

        if (currentLine.b.includes("function")) {

          
            functionName = getFunctionName(currentLine)

 

        } else {
            vscode.window.showWarningMessage('Not a proper Javascript function');
            return
        }
        //   console.log(editor.document.lineAt(editor.selection.active.line));
        if (editor) {

            let doc = `
/**
 * ${functionName}
 * 
 * @param       {any} param - description
 * @returns     {any} - description
 * @author      ${authorName} <${authorEmail}>
 */\r\n`;

            var document = editor.document;
            var selection_1 = editor.selection;
            // // Get the word within the selection
            var word = document.getText(selection_1);
            var reversed_1 = word.split('').reverse().join('');
            editor.edit(function (editBuilder) {
                console.log(editBuilder);
                editBuilder.replace(selection_1, doc);
                // editBuilder.insert('20',`gobinda nandi`);
            });

        }
    });
    context.subscriptions.push(disposable);
}

function getFunctionName(currentLine){
    // var number = classicFunctionNameString;
    let text = currentLine.b;
    let words = text.split(' ');
    let numberIndex = words.findIndex((word) => word == classicFunctionNameString);
    let nextWord = words[numberIndex + 1];
    return nextWord.split('(')[0];
}
exports.activate = activate;
