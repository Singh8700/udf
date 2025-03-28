$url = "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=1920"
$output = "public/images/hero-bg.jpg"
Invoke-WebRequest -Uri $url -OutFile $output
