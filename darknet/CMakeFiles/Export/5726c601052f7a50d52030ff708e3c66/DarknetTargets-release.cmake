#----------------------------------------------------------------
# Generated CMake target import file for configuration "Release".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "Darknet::dark" for configuration "Release"
set_property(TARGET Darknet::dark APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Darknet::dark PROPERTIES
  IMPORTED_IMPLIB_RELEASE "D:/Yolov4Website/darknet/darknet.lib"
  IMPORTED_LOCATION_RELEASE "D:/Yolov4Website/darknet/darknet.dll"
  )

list(APPEND _cmake_import_check_targets Darknet::dark )
list(APPEND _cmake_import_check_files_for_Darknet::dark "D:/Yolov4Website/darknet/darknet.lib" "D:/Yolov4Website/darknet/darknet.dll" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
