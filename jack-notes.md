# Notes from Jack

1. Would highly recommend using a `.env` file instead of embedding credentials in source, even for
   personal projects
2. Using the `editor.formatOnSave` option to automatically format your code will save a lot of time
   and make it easier for other devs to follow the same code style. I toggled my settings to only auto
   format my changes to reduce the noise in comparing my changes to your trunk branch
3. Avoid sending unsanitized error objects from the API back to the client, as these could open up some
   holes in security. Safer to use a common "handle request" function that will catch errors and return
   a sanitized response that's still useful for the client without revealing API internals.
   - Note that all endpoint handlers now _end with_ the expected response being returned, indicating
     that no errors prevented the expected end result
4. Separate validation into dedicated functionality. Better to return an array of errors than a boolean
   value, just in case an input fails validation for more than one reason (AJV is a good library for
   object validation stuff)
