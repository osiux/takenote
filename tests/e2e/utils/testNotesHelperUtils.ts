// testNotesHelperUtils.ts
// Utility functions for use in note tests

import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'

import {
  clickDynamicTestID,
  clickTestID,
  getDynamicTestID,
  getTestID,
  testIDShouldExist,
} from './testHelperUtils'

const assertNewNoteCreated = () => {
  getDynamicTestID(TestID.NOTE_LIST_ITEM + '0').should('contain', LabelText.NEW_NOTE)
}

const assertNoteEditorCharacterCount = (expectedCharacterCount: number) => {
  // all lines in the code editor should be descendants of the CodeMirror-code class
  cy.get('.CodeMirror-code').each(element => {
    expect(element.text().length).to.equal(expectedCharacterCount)
  })
}

const assertNoteEditorLineCount = (expectedLineCount: number) => {
  cy.get('.CodeMirror-code')
    .children()
    .should('have.length', expectedLineCount)
}

const assertNoteListLengthEquals = (expectedLength: number) => {
  getTestID(TestID.NOTE_LIST)
    .children()
    .should('have.length', expectedLength)
}

const assertNoteListLengthGTE = (expectedLength: number) => {
  getTestID(TestID.NOTE_LIST)
    .children()
    .should('have.length.gte', expectedLength)
}

const assertNoteListTitleAtIndex = (noteIndex: number, expectedTitle: string) => {
  getDynamicTestID(TestID.NOTE_TITLE + noteIndex)
    .children()
    .contains(expectedTitle)
}

const assertNoteOptionsOpened = () => {
  testIDShouldExist(TestID.NOTE_OPTIONS_NAV)
}

const clickCreateNewNote = () => {
  clickTestID(TestID.SIDEBAR_ACTION_CREATE_NEW_NOTE)
}

const clickEmptyTrash = () => {
  clickTestID(TestID.EMPTY_TRASH_BUTTON)
}

const clickNoteAtIndex = (noteIndex: number) => {
  getDynamicTestID(TestID.NOTE_LIST_ITEM + noteIndex).click()
}

// click a note with the specified index
const clickNoteOptions = (noteIndex: number = 0) => {
  clickDynamicTestID(TestID.NOTE_OPTIONS_DIV + noteIndex)
}

const openNoteContextMenu = (noteIndex: number = 0) => {
  cy.get('.note-list > div')
    .eq(noteIndex)
    .rightclick()
}

const clickNoteOptionDeleteNotePermanently = () => {
  clickTestID(TestID.NOTE_OPTION_DELETE_PERMANENTLY)
}

const clickNoteOptionFavorite = () => {
  clickTestID(TestID.NOTE_OPTION_FAVORITE)
}

const clickNoteOptionRestoreFromTrash = () => {
  clickTestID(TestID.NOTE_OPTION_RESTORE_FROM_TRASH)
}

const clickNoteOptionTrash = () => {
  clickTestID(TestID.NOTE_OPTION_TRASH)
}

const clickSyncNotes = () => {
  clickTestID(TestID.SIDEBAR_ACTION_SYNC_NOTES)
}

const typeNoteEditor = (contentToType: string) => {
  // force = true, cypress doesn't support typing in hidden elements
  cy.get('.CodeMirror textarea').type(contentToType, { force: true })
}

const typeNoteSearch = (contentToType: string) => {
  getTestID(TestID.NOTE_SEARCH).type(contentToType, { force: true })
}

export {
  assertNewNoteCreated,
  assertNoteEditorCharacterCount,
  assertNoteEditorLineCount,
  assertNoteListLengthEquals,
  assertNoteListLengthGTE,
  assertNoteListTitleAtIndex,
  assertNoteOptionsOpened,
  clickCreateNewNote,
  clickEmptyTrash,
  clickNoteAtIndex,
  clickNoteOptionDeleteNotePermanently,
  clickNoteOptionFavorite,
  clickNoteOptionRestoreFromTrash,
  clickNoteOptionTrash,
  clickNoteOptions,
  clickSyncNotes,
  typeNoteEditor,
  typeNoteSearch,
  openNoteContextMenu,
}
