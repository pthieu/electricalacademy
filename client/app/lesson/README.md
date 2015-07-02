Lesson Folder Structure:

lesson
	root_files_here (/lesson) -> actual view for public users
		lessonFocus (/lesson/:lesson_stub) -> focus on specific lesson
		lessonEdit (/lessonEdit) -> for editting lessons, get from dashboard
			lessonEditSingle (/lessonEdit/edit/:stub) -> edit a single lesson or create new