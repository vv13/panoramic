/**
 * Represents a panorama viewer.
 * @class
 * @param {object} args - Settings to apply to the viewer
 * @param {string} args.panorama - Panorama URL or path (absolute or relative)
 * @param {HTMLElement|string} args.container - Panorama container (should be a `div` or equivalent), can be a string (the ID of the element to retrieve)
 * @param {object} args.overlay - Image to add over the panorama
 * @param {string} args.overlay.image - Image URL or path
 * @param {object} [args.overlay.position=null] - Image position (default to the bottom left corner)
 * @param {string} [args.overlay.position.x=null] - Horizontal image position ('left' or 'right')
 * @param {string} [args.overlay.position.y=null] - Vertical image position ('top' or 'bottom')
 * @param {object} [args.overlay.size=null] - Image size (if it needs to be resized)
 * @param {number|string} [args.overlay.size.width=null] - Image width (in pixels or a percentage, like '20%')
 * @param {number|string} [args.overlay.size.height=null] - Image height (in pixels or a percentage, like '20%')
 * @param {integer} [args.segments=100] - Number of segments on the sphere
 * @param {integer} [args.rings=100] - Number of rings on the sphere
 * @param {boolean} [args.autoload=true] - `true` to automatically load the panorama, `false` to load it later (with the {@link PhotoSphereViewer#load|`.load`} method)
 * @param {boolean} [args.usexmpdata=true] - `true` if Photo Sphere Viewer must read XMP data, `false` if it is not necessary
 * @param {boolean} [args.cors_anonymous=true] - `true` to disable the exchange of user credentials via cookies, `false` otherwise
 * @param {object} [args.pano_size=null] - The panorama size, if cropped (unnecessary if XMP data can be read)
 * @param {number} [args.pano_size.full_width=null] - The full panorama width, before crop (the image width if `null`)
 * @param {number} [args.pano_size.full_height=null] - The full panorama height, before crop (the image height if `null`)
 * @param {number} [args.pano_size.cropped_width=null] - The cropped panorama width (the image width if `null`)
 * @param {number} [args.pano_size.cropped_height=null] - The cropped panorama height (the image height if `null`)
 * @param {number} [args.pano_size.cropped_x=null] - The cropped panorama horizontal offset relative to the full width (middle if `null`)
 * @param {number} [args.pano_size.cropped_y=null] - The cropped panorama vertical offset relative to the full height (middle if `null`)
 * @param {object} [args.captured_view=null] - The real captured view, compared to the theoritical 360°×180° possible view
 * @param {number} [args.captured_view.horizontal_fov=360] - The horizontal captured field of view in degrees (default to 360°)
 * @param {number} [args.captured_view.vertical_fov=180] - The vertical captured field of view in degrees (default to 180°)
 * @param {object} [args.default_position] - Defines the default position (the first point seen by the user)
 * @param {number|string} [args.default_position.long=0] - Default longitude, in radians (or in degrees if indicated, e.g. `'45deg'`)
 * @param {number|string} [args.default_position.lat=0] - Default latitude, in radians (or in degrees if indicated, e.g. `'45deg'`)
 * @param {number} [args.min_fov=30] - The minimal field of view, in degrees, between 1 and 179
 * @param {number} [args.max_fov=90] - The maximal field of view, in degrees, between 1 and 179
 * @param {boolean} [args.allow_user_interactions=true] - If set to `false`, the user won't be able to interact with the panorama (navigation bar is then disabled)
 * @param {boolean} [args.allow_scroll_to_zoom=true] - It set to `false`, the user won't be able to scroll with their mouse to zoom
 * @param {number|string} [args.tilt_up_max=π/2] - The maximal tilt up angle, in radians (or in degrees if indicated, e.g. `'30deg'`)
 * @param {number|string} [args.tilt_down_max=π/2] - The maximal tilt down angle, in radians (or in degrees if indicated, e.g. `'30deg'`)
 * @param {number|string} [args.min_longitude=0] - The minimal longitude to show
 * @param {number|string} [args.max_longitude=2π] - The maximal longitude to show
 * @param {number} [args.zoom_level=0] - The default zoom level, between 0 and 100
 * @param {boolean} [args.smooth_user_moves=true] - If set to `false` user moves have a speed fixed by `long_offset` and `lat_offset`
 * @param {number} [args.long_offset=π/360] - The longitude to travel per pixel moved by mouse/touch
 * @param {number} [args.lat_offset=π/180] - The latitude to travel per pixel moved by mouse/touch
 * @param {number|string} [args.keyboard_long_offset=π/60] - The longitude to travel when the user hits the left/right arrow
 * @param {number|string} [args.keyboard_lat_offset=π/120] - The latitude to travel when the user hits the up/down arrow
 * @param {integer} [args.time_anim=2000] - Delay before automatically animating the panorama in milliseconds, `false` to not animate
 * @param {boolean} [args.reverse_anim=true] - `true` if horizontal animation must be reversed when min/max longitude is reached (only if the whole circle is not described)
 * @param {string} [args.anim_speed=2rpm] - Animation speed in radians/degrees/revolutions per second/minute
 * @param {string} [args.vertical_anim_speed=2rpm] - Vertical animation speed in radians/degrees/revolutions per second/minute
 * @param {number|string} [args.vertical_anim_target=0] - Latitude to target during the autorotate animation, default to the equator
 * @param {boolean} [args.navbar=false] - Display the navigation bar if set to `true`
 * @param {object} [args.navbar_style] - Style of the navigation bar
 * @param {string} [args.navbar_style.backgroundColor=rgba(61, 61, 61, 0.5)] - Navigation bar background color
 * @param {string} [args.navbar_style.buttonsColor=rgba(255, 255, 255, 0.7)] - Buttons foreground color
 * @param {string} [args.navbar_style.buttonsBackgroundColor=transparent] - Buttons background color
 * @param {string} [args.navbar_style.activeButtonsBackgroundColor=rgba(255, 255, 255, 0.1)] - Active buttons background color
 * @param {number} [args.navbar_style.buttonsHeight=20] - Buttons height in pixels
 * @param {number} [args.navbar_style.autorotateThickness=1] - Autorotate icon thickness in pixels
 * @param {number} [args.navbar_style.zoomRangeWidth=50] - Zoom range width in pixels
 * @param {number} [args.navbar_style.zoomRangeThickness=1] - Zoom range thickness in pixels
 * @param {number} [args.navbar_style.zoomRangeDisk=7] - Zoom range disk diameter in pixels
 * @param {number} [args.navbar_style.fullscreenRatio=4/3] - Fullscreen icon ratio (width/height)
 * @param {number} [args.navbar_style.fullscreenThickness=2] - Fullscreen icon thickness in pixels
 * @param {number} [args.eyes_offset=5] - Eyes offset in VR mode
 * @param {string} [args.loading_msg=Loading…] - Loading message
 * @param {string} [args.loading_img=null] - Loading image URL or path (absolute or relative)
 * @param {HTMLElement|string} [args.loading_html=null] - An HTML loader (element to append to the container or string representing the HTML)
 * @param {object} [args.size] - Final size of the panorama container (e.g. {width: 500, height: 300})
 * @param {(number|string)} [args.size.width] - Final width in percentage (e.g. `'50%'`) or pixels (e.g. `500` or `'500px'`) ; default to current width
 * @param {(number|string)} [args.size.height] - Final height in percentage or pixels ; default to current height
 * @param {PhotoSphereViewer~onReady} [args.onready] - Function called once the panorama is ready and the first image is displayed
 **/
