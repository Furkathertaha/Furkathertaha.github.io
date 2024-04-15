---
layout: post
title:  "Matrix Operation for Stress Tensor"
date: 2024-04-15 00:00:00 +/-0000
categories: [My Notes]
tags: [Math, CG, PBS]
---

Suppose we define a 2-order stress tensor $$P_{ij}$$, where $$i$$ stands for scalar components constituting the vector and
$$j$$ represents the dimension. Giving a specific normalized direction $$n_j$$, projection of that stress tensor on surface of this normal direction
can be then described by $$P_{ij}\circ n_j$$, where $$\circ$$ denotes matrix multiplication. Therefore the rate of work can be expressed as

$$
\begin{aligned}
\dot{w} &= - \int_s \vec{(P_{ij}\circ n_j)}\cdot \vec{v_j} dA~~~~~~~~~~~~
= - \int_s [v_j]^\mathsf{T} \circ [P_{ij}]\circ [n_j] dA \\
&= - \int_s [[P_{ij}]^\mathsf{T} \circ [v_j]]^\mathsf{T} \circ [n_j] dA~~
= - \int_s \vec{([P_{ij}]^\mathsf{T} \circ [v_j])} \cdot \vec{n_j} dA \\
&= - \int_v \nabla \cdot (\bar{P} \vec{v}) dV,
\end{aligned}
$$

where $$ \nabla \cdot (\bar{P} \circ \vec{v}) = \vec{v} \cdot (\nabla \cdot \bar{P}^\mathsf{T}) + \bar{P}^\mathsf{T} : \nabla  \vec{v} ~~~~(1)$$ .

Proof:

$$
\nabla \cdot
\left[
\begin{array}{cc}
P_{11} & P_{12}  \\
P_{21} & P_{22} 
\end{array}
\right] 
\left[
\begin{array}{c}
v_1 \\
v_2
\end{array}
\right]=
\nabla \cdot
\left[
\begin{array}{c}
P_{11}v_1+P_{12}v_2 \\
P_{22}v_1+P_{22}v_2
\end{array}
\right]=
\frac{\partial}{\partial x_1}(P_{11}v_1+P_{12}v_2)+\frac{\partial}{\partial x_2}(P_{21}v_1+P_{22}v_2).
$$

$$
\vec{v} \cdot (\nabla \cdot \bar{P})=v_1(\frac{\partial P_{11}}{\partial x_1}+\frac{\partial P_{12}}{\partial x_2})+v_2(\frac{\partial P_{21}}{\partial x_1}+\frac{\partial P_{22}}{\partial x_2})
$$

$$
\bar{P} : \nabla  \vec{v} = P_{11} \frac{\partial v_1}{\partial x_1} + P_{12}\frac{\partial v_1}{\partial x_2} + P_{21}\frac{\partial v_2}{\partial x_1} +P_{22}\frac{\partial v_2}{\partial x_2}
$$

To equate two sides of $$(1)$$, $$\bar{P}$$ has to take its transpose at RHS. But there also convention that $$A:B = A_{ij}B_{ji}$$,
where no extra tranpose is needed.