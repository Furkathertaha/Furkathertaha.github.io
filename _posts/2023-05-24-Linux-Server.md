---
layout: post
title:  "Self-built Ubuntu Server"
date: 2023-05-24 00:00:00 +/-0000
categories: [My Notes]
tags: [Software]
---

# Self-built Ubuntu Server

**You might as well refer the link [BV1554y1n7zv](https://www.bilibili.com/video/BV1wY411p7mU/), but below are some notifications:**

1.Enter the installation through *Safe GUI*

1.When parting the disk, use four partitions: efi, / (form of ext4), swap, /home (form of xfs). efi and / should be primary partition, whereas swap and /home should be logic. Remember, boot from the efi.

2.When reboot during the installation, remember reset the boot option to ubuntu-installed disk. If you are using Nvidia card, before first reboot, power the card off so the system is with integrated-GPU, otherwise there’s a conflict and your screen may fail to load. The reason behind is interesting, Linux wanted to integrate the GPU driver into its kernel, but for NVDIA, as a closed-source hardware company, they refused to provide its official kernel to Linux foundation, unlike AMD and Intel. The result is, Linux developers invented an inverse (from execution to source) driver named nouveau originally in the installer. It is safe when you don’t have NV GPU. But once you have a recently-released product, it is very likely nouveau fails. Thus, only if you ban it, you can install NV driver to make everything work. About blacklist, after you blacklist the nouveau, you must connect the GPU power supply but cannot have HDMI or DP plugged in the GPU, ortherwise no nouveau in GPU PCIE channel would have no X signal, and this prohibit your use of VGA either. 

And things very important are, don’t stop the GUI (gdm, X, any thing related) arbitrarily, especially when the server is in site, and you don’t have a ssh connection. For my example, I came to close the gdm (even I use service gdm stop jut for the momentum) when everything is OK. I thought I would able to access CLI through GPU, but that is not the case. there’s only one for VGA, may due to the fact that I ban the nouveau. After restart, I hope everything would go back to normal, but that is also not true! gdm no start and still no access to GPU (and ctrl+alt+F5 has to be done manually). Tried with many steps, including re-install (light)gdm(3), NV driver, desktop, now it’s hard to have GUI login (still manual change GUI state by ctrl+alt+F1), but after typing the password, everything goes black either. Things just doesn’t work. There must be a true reason and a way to fix this, but to hard to try. This case is whatever you can just login to tty CLI log, no X at all. And change to F1 only work before typing password, not yet try for [this](https://mbd.baidu.com/ma/s/Dcs60wDC) and [this](https://www.bilibili.com/read/mobile?id=24422774), may be helpful. But the thing is, NV, ubuntu, and X are closely related, when your GPU has a connection with screen or not matters a lot, I know some one of JI’s PC would power off if screen is not connected or powered off. And so as what is the case after blacklist nouveau do cut the screen connection with GPU before having NV driver. It is so dangerous for recent RTX series, but everything actually can work well for my AMD GPU, easily open and close desktop, and it is even more robust for my 2080Ti. Foreseeable, it is gonna increasingly worse with future released Linux and NV 3d card. 

3.Suppose now you do not have an internet, fist follow [this](https://yebd1h.smartapps.cn/pages/blog/index?blogId=131846961&_swebfr=1&_swebFromHost=baiduboxapp) to install some basic tools for internet driver installation. If you have net wire, no need for this step. Note, if the driver you use is a WLAN, please choose as the [PEAP](https://blog.csdn.net/qq_27190305/article/details/109822637) verification.

4.To [utilize](https://virtualgl.org/About/Background) server's GPU, follow [th](https://shaoyecheng.com/uncategorized/2020-04-08-TurboVNC-VirtualGL%EF%BC%9A%E5%AE%9E%E7%8E%B0%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%9A%84%E5%A4%9A%E7%94%A8%E6%88%B7%E5%9B%BE%E5%BD%A2%E5%8C%96%E8%AE%BF%E9%97%AE%E4%B8%8E%E7%A1%AC%E4%BB%B6%E5%8A%A0%E9%80%9F.html) [is](https://blog.csdn.net/weixin_44831881/article/details/119810165) to set [virtualGL](https://virtualgl.org/Documentation/Documentation) **before** installing NV driver, when there is a fail for apt-get install something, and –fix-broken can hard work, apt install -f first. Remember, just install for future, do not set its environment right now! When installing NV driver, pkg-config and libglvnd-dev may be needed beforehead.

5.Follow [this](https://blog.csdn.net/baiyu33/article/details/130630836) to have JI VPN in ubuntu.

6.Follow [this](https://dev.to/selllami/how-to-run-mobaxterm-on-ubuntu-linux-with-wine-ohf) and [this](https://wiki.winehq.org/Ubuntu_zhcn) to install X-ssh for ubuntu.

7.Follow [this](https://estuarine.jp/2023/04/oneapi-ubuntu-22-04/?lang=en) and [this](https://www.intel.com/content/www/us/en/developer/tools/oneapi/hpc-toolkit-download.html?operatingsystem=linux&distributions=aptpackagemanager) to have Intel-toolkit for HPC


