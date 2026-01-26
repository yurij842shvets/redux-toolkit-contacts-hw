import {createSelector} from '@reduxjs/toolkit'
import { statusFilters } from '../constants/constants'

export const selectFilter = state => state.filter.value

export const selectList = state => state.contacts.list

export const selectIsLoading = state => state.contacts.isLoading

export const selectError = state => state.contacts.error


export const selectVisibleContacts = createSelector(
    [selectList, selectFilter],
    (contacts, filter) => {
        switch(filter) {
            case statusFilters.read:
                return contacts.filter(contact => contact.status === statusFilters.read)
            case statusFilters.unread:
                return contacts.filter(contact => contact.status === statusFilters.unread)
            default:
                return contacts
            }
    }
)

export const selectContactCount = createSelector([selectList], contacts => 
    contacts.reduce((acc, contact) => {
        contact.status === statusFilters.read ? acc.read++ : acc.unread++
        return acc
    },
    {read: 0, unread: 0}
))