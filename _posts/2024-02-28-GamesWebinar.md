---
layout: post
title:  "Games Webinar Notes"
date: 2024-02-28 00:00:00 +/-0000
categories: [My Notes]
tags: [CG, PBS, Math]
---

## Side Tips
- Insert below code into <code class="language-plaintext highlighter-rouge">_layouts/default.html</code> or <code class="language-plaintext highlighter-rouge">_layouts/post.html</code> to enable LaTex writing in Jekyll
```
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script> 
```
- Git Bash on Windows: when running sh, it seems that I have to go to the same directory where the .sh script lies and sh xx.sh, but not call it by sh xx/xx.sh from an indirect path

# GAMES 201 Notes:

## 1. Matrix Operation (P8: 24min)

$$ F' = (I+\tau C) F \rightarrow \frac{\partial F'}{\partial C} = \tau F^\mathsf{T} $$ is derived from the fact: \\
$$ F' = CF \rightarrow F'^\mathsf{T} = F^\mathsf{T} C^\mathsf{T} ,$$
where $$\frac{\partial F'^\mathsf{T}}{\partial C^\mathsf{T}}= F^\mathsf{T} $$. \\
It looks imediately derivation on that slide is wrong, but we might as well consider the whole differential chain. 
Similarly, $$\frac{\partial C^\mathsf{T}}{\partial v^\mathsf{T}}= (x^\mathsf{T})^\mathsf{T} = x $$. Then, \\
$$\frac{\partial F'^\mathsf{T}}{\partial v^\mathsf{T}}=\frac{\partial F'^\mathsf{T}}{\partial C^\mathsf{T}}\frac{\partial C^\mathsf{T}}{\partial v^\mathsf{T}}= F^\mathsf{T}x $$ \\
This continues forward towards $$\psi$$, thence we get the expression of $$(\frac{\partial \psi}{\partial v})^\mathsf{T}$$. It computes the nodal force and is actually a vactor, so it doesn't harm if it is transposed. 


# GAMES 103 Notes:

## 1. Energy of Spring System (Matrix equation with chain manipulation)

$$E = \frac{1}{2} ([\frac{\partial \phi}{\partial x}] [x])^\mathsf{T} [K] ([\frac{\partial \phi}{\partial x}] [x]) = \frac{1}{2} [x]^\mathsf{T} ( [\frac{\partial \phi}{\partial x}] ^\mathsf{T} [K] [\frac{\partial \phi}{\partial x}] ) [x]$$

Note that $$E$$ is the total energy, a scalar. $$[K]$$ and $$[ \frac{\partial \phi}{\partial x} ]$$ are 2d matrices, while $$[\phi]$$, $$[x]$$ and $$[F]$$ are vectors.

$$[F] = \frac{\partial E}{\partial x} = ( [\frac{\partial \phi}{\partial x}]^\mathsf{T} [K] [\frac{\partial \phi}{\partial x}] )[x] = [\frac{\partial \phi}{\partial x}]^\mathsf{T} [K] [\phi] $$

## 2. Constrained Dynamics (P7: 58 min)

$$ 
\left[
\begin{array}{cc}
M & -\Delta t J^\mathsf{T}  \\
\Delta t J & C 
\end{array}
\right] 
\left[
\begin{array}{c}
v' \\
\lambda '
\end{array}
\right]=
\left[
\begin{array}{c}
Mv \\
-\phi 
\end{array}
\right]
\tag{dual variable}
$$

This gives 

$$
\begin{cases} 
		Mv' &-&\Delta t J^\mathsf{T} \lambda ' &= &Mv \\ 
		\Delta t J v' &+& C \lambda ' &= &-\phi
\end{cases},
$$

and further

$$
Mv' = Mv - \Delta t J^\mathsf{T} C^{-1} \phi - \Delta t^2 J^\mathsf{T} C^{-1} J v' = Mv + f \Delta t  - \Delta t^2 J^\mathsf{T} C^{-1} J v'.
$$ 

If implicit time integration,

$$
\begin{cases} 
		\Delta v = a' \Delta t \Rightarrow  Mv' = Mv + f' \Delta t\\ 
		\Delta x = v' \Delta t.
\end{cases}
$$

So

$$
\begin{aligned}
 & f' \Delta t - f \Delta t & ≟ & - \Delta t^2 J^\mathsf{T} C^{-1} J v'\\
 \Rightarrow ~ & f'- f & ≟ & -J^\mathsf{T} C^{-1} J \Delta x \\
 \Rightarrow ~ & \frac{\partial f}{\partial x} & ≟ & -J^\mathsf{T} C^{-1} J
\end{aligned}
$$

but

$$
\begin{aligned}
f &= - J^\mathsf{T} C^{-1}  \phi , \\
\frac{\partial f}{\partial x} &= -\frac{\partial J^\mathsf{T}}{\partial x } C^{-1} \phi -J^\mathsf{T} C^{-1} \frac{\partial \phi}{\partial x} = \frac{\partial J^\mathsf{T}}{\partial x } \lambda -J^\mathsf{T} C^{-1}  J  .
\end{aligned}
$$

Therefore, it needs to add the extra term to let

$$
Mv' = Mv - \Delta t J^\mathsf{T} C^{-1} \phi - \Delta t^2 J^\mathsf{T} C^{-1} J v' + \Delta t^2 \frac{\partial J^\mathsf{T}}{\partial x } \lambda v',
$$

and this induces back to

$$ 
\left[
\begin{array}{cc}
M - \Delta t^2 \frac{\partial J^\mathsf{T}}{\partial x } \lambda & -\Delta t J^\mathsf{T}  \\
\Delta t J & C 
\end{array}
\right] 
\left[
\begin{array}{c}
v' \\
\lambda '
\end{array}
\right]=
\left[
\begin{array}{c}
Mv \\
-\phi 
\end{array}
\right].
$$

Only in this way does it equal first-order implicit time integration.




