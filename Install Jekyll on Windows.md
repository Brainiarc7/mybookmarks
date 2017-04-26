Install Jekyll on Windows
========================

- Install [rubyinstaller-2.2.3-x64.exe](http://rubyinstaller.org/downloads/) to C:\Ruby200
- Extract [DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe](http://cdn.rubyinstaller.org/archives/devkits/DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe) to c:\Ruby22\devkit
- Add C:\Ruby22\bin to PATH

```bat
CD /d c:\Ruby22\devkit
ruby dk.rb init
```

- Ensure "C:\Ruby22\devkit\config.yml" contains this:

```txt
---
- C:/Ruby200
```


Extract curl-7.40.0-devel-mingw64.7z to c:\Ruby22\curl 

Then run

```bat
ruby dk.rb install
gem update
gem install bundle
gem install directory_watcher
gem install wdm
gem install github-pages
gem install jekyll --version "=1.4.2"
gem uninstall jekyll --version "=1.4.3"


python-2.7.6.amd64.msi
python ez_setup.py     # http://peak.telecommunity.com/dist/ez_setup.py
easy_install pygments
gem uninstall pygments.rb --version "=0.5.1"
gem install pygments.rb --version "=0.5.0"
```


 SSL_CERT_FILE=C:\path-to-pem-file\cacert.pem

 
# Run it

Finally, to ensure Jekyll understands UTF-8 files (save UTF8, *not* UTF8-BOM)

```bat
chcp 65001
call jekyll serve --watch --trace
```

# Links


http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html
http://jekyllthemes.org/
https://github.com/davidebbo-test/BlogConverter
http://blog.davidebbo.com/2014/01/converting-my-old-blog.html
https://github.com/Sandra/Sandra.Snow


# How to include a Markdown file using Jekyll's include mechanism

```markdown
{% capture my-include %}{% include test.md %}{% endcapture %}
{{ my-include | markdownify }}
```

src: [Rendering markdown includes in Jekyll](http://wolfslittlestore.be/2013/10/rendering-markdown-in-jekyll/)





http://blog.florianwolters.de/educational/2014/04/18/Running_Jekyll_with_GitHub_Pages_using_Windows_8.1_x64_and_Ruby_2.0_x64/

