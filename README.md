# PostcardCreator
<h4>Creates a new image from the one you upload.</h4>

<h2>Technology</h2>
<ul>
  <li>Back-End: ASP.NET MVC</li>
  <li>Front-End: HTML (Razor), CSS (Bootstrap 4), JavaScript (jQuery)</li>
</ul>

<h2>How it works:</h2>
<ul>
  <li>You upload an image using the online form. This will lead you to the new image with the message</li>
  <ul>
    <li>The modified image will be found on the "/Home/Change" page</li>
    <li>You will not get there with en empty form value</li>
  </ul>
  <li>Enter your email and press send. This should send the new modified image to the email specified</li>
</ul>

<h2>Why I chose to do this application</h2>
<ul>
  <li>I found it a bit of a challenge, which made it all the bit more interesting</li>
  <li>I love working with web graphics</li>
</ul>

<h2>Libraries/Packages Used</h2>
<ul>
  <li>Bootstrap 4 (needed to update from Bootstrap 3)</li>
  <li>jQuery</li>
</ul>

<h2>How to Test</h2>
<ul>
  <li>Because this project was done without an SMTP server, the tester needs to look for the comment that says "implement SendEmail function here" in the controller named "Modified"</li>
  <ul>
    <li>The app will NOT send anything without it</li>
    <li>The function is very much self-explanatory</li>
  </ul>
</ul>
