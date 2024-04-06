---
layout: post
title:  "Understanding Lagrange Multiplier, KKT Condition and Dual Problem"
date: 2024-04-06 00:00:00 +/-0000
categories: [My Notes]
tags: [Math, ML]
---

# Why Lagrange multiplier $$\lambda$$ can work

Let's consider general multi-dimensional constrained optimization problems. 
To find the optimized point, one can start from where the constraint is satisfied. Every constraint can be viewed as a hyper-surface (including point and curve), 
where at each point allowable moving directions $$A$$ must be orthogonal to local gradient to go along the contour.

$$
C(x)=0, ~ A = (\nabla C(x))^{\bot}
$$    

Taking all constraints into consideration, allowable directions for modifying $$x$$ to change the optimized term is:

$$
A = (\nabla C_1)^{\bot} \cap (\nabla C_2)^{\bot} \cap \dots \cap (\nabla C_n)^{\bot}.
$$

If this is the optimized point, the gradient of term to be optimized (max or min) mustn't lie in this allowable space.
Otherwise, the term can be further optimized without violating all constraints. 

$$
\nabla f(x) \in \bigg((\nabla C_1)^{\bot} \cap (\nabla C_2)^{\bot} \cap \dots \cap (\nabla C_n)^{\bot} \bigg)^{\bot}
$$ 

This is equivalent to:

$$
\begin{aligned}
\nabla f(x) &\in Space\{\nabla C_1,\nabla C_2,\dots,\nabla C_n\} \\
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \Rightarrow \nabla f(x) &= \lambda_1 \nabla C_1+\lambda_2\nabla C_2+\dots+\lambda_n\nabla C_n ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(1)
\end{aligned}
$$

This explains why in Lagrange Multiplier, constructing higher dimensional $$L$$ space can resolve the problem:

$$
\begin{aligned}
L &= f(x)-\sum_i^n \lambda_i C_i(x)\\
\nabla L =0&=\nabla f(x) - \lambda_1 \nabla C_1-\lambda_2\nabla C_2-\dots-\lambda_n\nabla C_n ~~~~~~~~~\dots\dots explained~as~(1)\\
with& ~~~ C_i(x)=0 ,~i=1\cdots n~~~~~~~~~~~~~~~~~~\dots\dots\dots\dots constraint~hypersurfaces 
\end{aligned}
$$

Here, the sign of $$\lambda$$ cannot be quite informative for equality constraints.
However, it can provide some foresight for inequailty constraints.

# KKT Conditions for Inequality Constraints

If one constraint is $$c(x) \leq 0$$, it would be equivalent to $$c(x) + p_1^2 = 0$$.  
If one constraint is $$c(x) \geq 0$$, it would be equivalent to $$c(x) - p_2^2 = 0$$.  
Here, $$p$$ can be any number, and thus treated as additional dimensions together with $$x$$.
Therefore, one can obtain the relation of (1) for $$p_j$$ dimension as:

$$
\frac{\partial f}{\partial p_j} = 0 = 2\lambda_j p_j,
$$

which means either $$\lambda_j$$ or $$p_j$$ is 0. If both are 0, it means the equality case of this constraint is useless.
However, this happens only if you provide an useless constraint (like other provided constraints already satisfy this constraint).

<img src="assets/images/Notes/constraints.png" alt="illu1" width="400" />

In this scenario, only $$\lambda_j = 0$$ and $$p_i \neq 0$$ holds. No need at all to consider if both are 0,
and $$\lambda_j \neq 0$$ with $$p_i = 0$$ would yield no solution.
In general, we only consider one of $$\lambda$$ and $$p$$ is 0, to see if a valid solution can be derived. 

Another important feature for inequailty constraint optimization is, signs of $$\lambda$$ can be somehow infered.
That is because when letting $$\nabla L = 0$$, we are indeed finding extrema of $$L$$.  
From KKT, constraints are actived only when equality,
where $$\frac{C(x')}{||C(x')||}\nabla C$$ ($$x'$$ is an inequailty position) is the normal direction not violating the constraint.      
If $$f(x)$$ is to be maxmized, consider $$-\lambda C(x)$$ :     
$$\nabla f$$ is the direction in which $$f(x)$$ increases,
which should be opposite (just normal component of $$\nabla f$$ with respect to the constraint hypersurface) to $$\frac{C(x')}{||C(x')||}\nabla C$$ only in which the constraint is satisfied, if it is the optimal point.
So you don't find further increase of $$f(x)$$ within the constraint.   
If $$f(x)$$ is to be minimized, consider $$-\lambda C(x)$$:  
$$-\nabla f$$ is the direction in which $$f(x)$$ decreases,
which should be opposite (just normal component of $$\nabla f$$ with respect to the constraint hypersurface) to $$\frac{C(x')}{||C(x')||}\nabla C$$ only in which the constraint is satisfied, if it is the optimal point.
So you don't find further decrease of $$f(x)$$ within the constraint.   
However, we have many constraints, so it is a combined effect. If you know more features about
the constraint functions and optimization function, a clearer sign might be concluded.
<!--Otherwise, in each above case, obtaining extrema of $$L$$ encourages either to violate constraints or not to optimize $$f(x)$$,
but not to acheive both we want.-->
Also, signs of $$C(x)$$ are known from the constraints, so we can determine signs of corresponding $$\lambda$$.

<img src="assets/images/Notes/signLambda.png" alt="illu1" width="400" />

In above figure, the same constraints can yield two extremas of $$L$$.
Depending on whether it is $$\max f(x)$$ or $$\min f(x)$$, the sign of $$\lambda$$ is different, so as the final solution.
Of course you can solve for both signs of $$\lambda$$ and compare each $$f(x)$$ magnitude, but sometimes it is not efficient.

# Dual Problem for Lagrange Multiplier
