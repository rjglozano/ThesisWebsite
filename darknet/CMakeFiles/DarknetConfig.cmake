# Config file for the Darknet package

get_filename_component(Darknet_CMAKE_DIR "${CMAKE_CURRENT_LIST_FILE}" PATH)
list(APPEND CMAKE_MODULE_PATH "${Darknet_CMAKE_DIR}")

include(CMakeFindDependencyMacro)

if(1)
  find_dependency(OpenCV)
endif()

if(OFF)
  include(CheckLanguage)
  check_language(CUDA)
  if(NOT CMAKE_CUDA_COMPILER)
    message(STATUS " --> WARNING: Unable to find native CUDA integration!")
  endif()
  if()
    find_dependency(CUDNN)
  endif()
endif()

set(CMAKE_THREAD_PREFER_PTHREAD ON)
find_dependency(Threads)

if(MSVC)
  find_dependency(PThreads4W)
  set(CMAKE_CXX_FLAGS "/wd4018 /wd4244 /wd4267 /wd4305 ${CMAKE_CXX_FLAGS}")
  if()
    find_dependency(unofficial-getopt-win32)
  endif()
endif()

if(TRUE)
  find_dependency(OpenMP)
endif()

# Our library dependencies (contains definitions for IMPORTED targets)
include("${Darknet_CMAKE_DIR}/DarknetTargets.cmake")
include("${Darknet_CMAKE_DIR}/DarknetConfigVersion.cmake")

if(1)
  set_property(TARGET Darknet::dark APPEND PROPERTY INTERFACE_INCLUDE_DIRECTORIES "${OpenCV_INCLUDE_DIRS}")
endif()

get_target_property(FULL_DARKNET_INCLUDE_DIRS Darknet::dark INTERFACE_INCLUDE_DIRECTORIES)
list(GET FULL_DARKNET_INCLUDE_DIRS 0 Darknet_INCLUDE_DIR)
get_filename_component(Darknet_INCLUDE_DIR "${Darknet_INCLUDE_DIR}" REALPATH)

find_package_handle_standard_args(Darknet REQUIRED_VARS Darknet_INCLUDE_DIR VERSION_VAR PACKAGE_VERSION)
